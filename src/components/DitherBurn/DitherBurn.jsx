import { useEffect, useRef } from "react"

const MAX_DPR = 2
const NAME = "DitherBurn"

const LAYERS = 84
const LEVELS = 7

const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](
  vec2(-1.0, -1.0),
  vec2(3.0, -1.0),
  vec2(-1.0, 3.0)
);

void main() {
  gl_Position = vec4(P[gl_VertexID], 0.0, 1.0);
}
`

const FIELD_SRC = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;

out vec4 o;

const float TAU = 6.28318530718;
const float LAYERS = ${LAYERS.toFixed(1)};
const float GAIN = 0.5;

const vec2 CENTRE = vec2(0.68, -0.21);
const float TILT = 0.1;
const float ZOOM = 1.05;
const float THETA = 2.135;
const float SHEAR = 0.962;
const float SHRINK = 0.952;

const vec2 WARP_FREQ = vec2(0.4, 2.35);
const vec2 WARP_AMP = vec2(0.125, 0.026);
const vec2 ASPECT = vec2(2.0, 0.19);

const float OFFSET = 0.36;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 97.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;

  pos = rot(uAngle) * pos / uSize;

  float t = uTime * 0.49 + PHASE;

  float breath =
    (-sin(uTime * 0.735) +
    sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;

  vec2 u = rot(TILT) *
    ((pos - CENTRE) * (ZOOM - breath * 0.085));

  mat2 fold = mat2(
    cos(THETA),
    sin(THETA),
    -SHEAR,
    cos(THETA)
  );

  vec3 col = vec3(0.0);

  for (float i = 1.0; i <= LAYERS; i += 1.0) {

    u.x -= sin(
      u.y * WARP_FREQ.x +
      t +
      i * 0.007
    ) * WARP_AMP.x;

    u.y -= sin(
      u.x * WARP_FREQ.y -
      t +
      i * 0.02
    ) * WARP_AMP.y;

    u = fold * u * SHRINK;

    vec2 q =
      (u - vec2(OFFSET + breath * 0.1, 0.0))
      * ASPECT;

    float g =
      GLOW /
      (dot(q, q) + SOFT) *
      (0.25 + breath * 0.4);

    float r = length(u);

    float k =
      sin(
        i * CYCLE +
        t * 1.2 +
        r * HUE_TRAVEL
      ) * 0.5 + 0.5;

    col +=
      g *
      mix(uC1, uC2, k) *
      (0.62 + 0.5 * k) *
      exp2(-r * FALLOFF);
  }

  vec3 x = max(col * GAIN, 0.0);

  col =
    (x * (2.51 * x + 0.03)) /
    (x * (2.43 * x + 0.59) + 0.14);

  col =
    pow(
      clamp(col, 0.0, 1.0),
      vec3(0.85, 0.92, 0.98)
    );

  col *=
    1.0 -
    smoothstep(0.5, 1.6, length(pos)) * 0.07;

  o = vec4(col, 1.0);
}
`

const FINISH_SRC = `#version 300 es
precision highp float;
precision highp int;

uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform float uCell;

out vec4 o;

const vec3 LUMA =
  vec3(0.2126, 0.7152, 0.0722);

const float BAYER[16] = float[16](
  0.0, 8.0, 2.0, 10.0,
  12.0, 4.0, 14.0, 6.0,
  3.0, 11.0, 1.0, 9.0,
  15.0, 7.0, 13.0, 5.0
);

const float LEVELS = ${LEVELS.toFixed(1)};
const float BURN_LIFT = 1.15;

float ign(vec2 p, float f) {
  p += 5.588238 * mod(f, 64.0);

  return fract(
    52.9829189 *
    fract(
      0.06711056 * p.x +
      0.00583715 * p.y
    )
  );
}

vec3 scene(vec2 uv) {
  return texture(
    uField,
    clamp(uv, 0.0, 1.0)
  ).rgb;
}

float near(vec2 p) {
  vec2 d = (p - uMouse) / uReach;

  return uOn * exp(-dot(d, d));
}

vec3 dither(vec2 frag, vec2 uv) {

  vec2 g = floor(frag / uCell);
  vec2 cc = (g + 0.5) * uCell;

  vec3 soft = scene(uv);
  vec3 ink = scene(cc / uRes);

  float lvl = dot(ink, LUMA);

  float w = 0.0;

  if (uOn > 0.0) {
    w = smoothstep(
      0.0,
      1.0,
      near(cc)
    );
  }

  float levels = mix(
    LEVELS,
    1.0,
    w
  );

  ivec2 b = ivec2(mod(g, 4.0));

  float th =
    (BAYER[b.y * 4 + b.x] + 0.5) /
    16.0;

  float qz =
    floor(
      pow(max(lvl, 0.0), 0.8) *
      levels +
      th
    ) /
    levels;

  vec3 dith =
    clamp(
      ink /
      max(lvl, 1e-4) *
      pow(min(qz, 1.0), 1.25) *
      mix(1.0, BURN_LIFT, w),
      0.0,
      1.4
    );

  float presence =
    smoothstep(0.03, 0.14, lvl) *
    mix(0.5, 1.0, w);

  return mix(
    soft,
    dith,
    presence
  );
}

void main() {

  vec2 frag = gl_FragCoord.xy;

  vec3 L =
    max(
      dither(
        frag,
        frag / uRes
      ),
      0.0
    );

  vec3 dark =
    uBg +
    L * (1.0 - uBg);

  float strength =
    clamp(
      max(
        L.r,
        max(L.g, L.b)
      ),
      0.0,
      1.0
    );

  vec3 paper =
    uBg * (1.0 - strength) +
    L * 0.96;

  vec3 col =
    mix(
      dark,
      paper,
      uPaper
    );

  col +=
    (
      ign(
        frag,
        floor(uTime * 24.0)
      ) - 0.5
    ) / 255.0;

  o =
    vec4(
      clamp(col, 0.0, 1.0),
      1.0
    );
}
`

const DEFAULTS = {
  background: "#08070B",
  color1: "#FF0000",
  color2: "#1A1A1A",
}

const colorCache = new Map()

function parseColor(input) {
  if (!input) return null

  const key = String(input)

  if (colorCache.has(key)) {
    return colorCache.get(key)
  }

  let s = key.trim()

  const variable = s.match(
    /^var\\(\\s*--[^,]+,\\s*(.+)\\)$/
  )

  if (variable) {
    s = variable[1].trim()
  }

  let output = null

  if (s.charAt(0) === "#") {

    let hex = s.slice(1)

    if (hex.length === 3 || hex.length === 4) {
      hex =
        hex[0] + hex[0] +
        hex[1] + hex[1] +
        hex[2] + hex[2]
    }

    if (hex.length >= 6) {

      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)

      if (
        Number.isFinite(r) &&
        Number.isFinite(g) &&
        Number.isFinite(b)
      ) {
        output = [
          r / 255,
          g / 255,
          b / 255,
        ]
      }
    }

  } else {

    const match =
      s.match(/^(rgba?|hsla?)\\(([^)]*)\\)/i)

    if (match) {

      const parts =
        match[2]
          .split(/[\s,/]+/)
          .filter(Boolean)

      const getNumber = (index) =>
        parseFloat(parts[index])

      if (
        parts.length >= 3 &&
        [0, 1, 2].every(
          (i) => Number.isFinite(getNumber(i))
        )
      ) {

        if (
          match[1]
            .toLowerCase()
            .startsWith("rgb")
        ) {

          const channel = (index) =>
            parts[index].endsWith("%")
              ? getNumber(index) / 100
              : getNumber(index) / 255

          output = [
            channel(0),
            channel(1),
            channel(2),
          ]

        } else {

          const hue =
            (((getNumber(0) % 360) + 360) % 360) / 360

          const saturation =
            getNumber(1) / 100

          const lightness =
            getNumber(2) / 100

          const q =
            lightness < 0.5
              ? lightness * (1 + saturation)
              : lightness +
                saturation -
                lightness * saturation

          const p =
            2 * lightness - q

          const hueToRgb = (t) => {

            if (t < 0) t += 1
            if (t > 1) t -= 1

            if (t < 1 / 6)
              return p +
                (q - p) * 6 * t

            if (t < 1 / 2)
              return q

            if (t < 2 / 3)
              return p +
                (q - p) *
                (2 / 3 - t) *
                6

            return p
          }

          output = [
            hueToRgb(hue + 1 / 3),
            hueToRgb(hue),
            hueToRgb(hue - 1 / 3),
          ]
        }

        output = output.map(
          (c) =>
            Math.min(
              1,
              Math.max(0, c)
            )
        )
      }
    }
  }

  colorCache.set(key, output)

  return output
}

function color(input, fallback) {
  return (
    parseColor(input) ||
    parseColor(fallback)
  )
}

function num(value, fallback) {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : fallback
}

function clampN(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

function createProgram(gl, fragmentSource, label) {

  const createShader = (type, source) => {

    const shader =
      gl.createShader(type)

    if (!shader) return null

    gl.shaderSource(
      shader,
      source
    )

    gl.compileShader(shader)

    if (
      !gl.getShaderParameter(
        shader,
        gl.COMPILE_STATUS
      )
    ) {

      console.error(
        `${NAME} ${label} shader:`,
        gl.getShaderInfoLog(shader)
      )

      gl.deleteShader(shader)

      return null
    }

    return shader
  }

  const vertexShader =
    createShader(
      gl.VERTEX_SHADER,
      VERT_SRC
    )

  const fragmentShader =
    createShader(
      gl.FRAGMENT_SHADER,
      fragmentSource
    )

  if (!vertexShader || !fragmentShader) {
    return null
  }

  const program =
    gl.createProgram()

  if (!program) return null

  gl.attachShader(
    program,
    vertexShader
  )

  gl.attachShader(
    program,
    fragmentShader
  )

  gl.linkProgram(program)

  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (
    !gl.getProgramParameter(
      program,
      gl.LINK_STATUS
    )
  ) {

    console.error(
      `${NAME} ${label} link:`,
      gl.getProgramInfoLog(program)
    )

    gl.deleteProgram(program)

    return null
  }

  return program
}

function getLocations(gl, program, names) {

  const output = {}

  names.forEach((name) => {
    output[name] =
      gl.getUniformLocation(
        program,
        name
      )
  })

  return output
}

function createFieldTarget(gl) {

  const framebuffer =
    gl.createFramebuffer()

  let texture = null
  let width = 0
  let height = 0

  let half =
    !!gl.getExtension(
      "EXT_color_buffer_float"
    )

  return {

    framebuffer,

    texture: () => texture,

    width: () => width,

    height: () => height,

    resize(newWidth, newHeight) {

      if (
        newWidth === width &&
        newHeight === height &&
        texture
      ) {
        return
      }

      for (let attempt = 0; attempt < 2; attempt++) {

        if (texture) {
          gl.deleteTexture(texture)
        }

        texture =
          gl.createTexture()

        gl.bindTexture(
          gl.TEXTURE_2D,
          texture
        )

        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          gl.LINEAR
        )

        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MAG_FILTER,
          gl.LINEAR
        )

        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_WRAP_S,
          gl.CLAMP_TO_EDGE
        )

        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_WRAP_T,
          gl.CLAMP_TO_EDGE
        )

        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          half
            ? gl.RGBA16F
            : gl.RGBA8,
          newWidth,
          newHeight,
          0,
          gl.RGBA,
          half
            ? gl.HALF_FLOAT
            : gl.UNSIGNED_BYTE,
          null
        )

        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          framebuffer
        )

        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          texture,
          0
        )

        const ok =
          gl.checkFramebufferStatus(
            gl.FRAMEBUFFER
          ) === gl.FRAMEBUFFER_COMPLETE

        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          null
        )

        if (ok || !half) break

        half = false
      }

      width = newWidth
      height = newHeight
    },

    dispose() {

      if (texture) {
        gl.deleteTexture(texture)
      }

      gl.deleteFramebuffer(
        framebuffer
      )
    },
  }
}

function trackPointer(root) {

  const pointer = {
    tx: 0,
    ty: 0,
    inside: false,
    seen: false,
  }

  const readPointer = (event) => {

    const rect =
      root.getBoundingClientRect()

    const scaleX =
      root.offsetWidth /
      (rect.width || 1)

    const scaleY =
      root.offsetHeight /
      (rect.height || 1)

    pointer.tx =
      (event.clientX - rect.left) *
      scaleX

    pointer.ty =
      (event.clientY - rect.top) *
      scaleY

    pointer.inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom

    pointer.seen = true
  }

  const pointerOut = (event) => {

    if (!event.relatedTarget) {
      pointer.inside = false
    }
  }

  window.addEventListener(
    "pointermove",
    readPointer,
    { passive: true }
  )

  window.addEventListener(
    "pointerdown",
    readPointer,
    { passive: true }
  )

  document.addEventListener(
    "pointerout",
    pointerOut
  )

  return {

    pointer,

    dispose() {

      window.removeEventListener(
        "pointermove",
        readPointer
      )

      window.removeEventListener(
        "pointerdown",
        readPointer
      )

      document.removeEventListener(
        "pointerout",
        pointerOut
      )
    },
  }
}

function DitherBurn({
  style,
  background = DEFAULTS.background,
  color1 = DEFAULTS.color1,
  color2 = DEFAULTS.color2,
  speed = 62,
  size = 156,
  angle = -98,
  pixelSize = 2,
  hover = 75,
  reach = 595,
  width,
  height,
}) {

  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  const valuesRef = useRef({
    background,
    color1,
    color2,
    speed: 1,
    size: 1,
    angle: 0,
    pixelSize: 3,
    hover: 1,
    reach: 200,
  })

  valuesRef.current = {

    background,

    color1,

    color2,

    speed:
      clampN(
        num(speed, 50),
        0,
        100
      ) / 50,

    size:
      clampN(
        num(size, 100),
        50,
        200
      ) / 100,

    angle:
      (
        clampN(
          num(angle, 0),
          -180,
          180
        ) *
        Math.PI
      ) / 180,

    pixelSize:
      Math.round(
        clampN(
          num(pixelSize, 3),
          2,
          12
        )
      ),

    hover:
      clampN(
        num(hover, 100),
        0,
        200
      ) / 100,

    reach:
      clampN(
        num(reach, 200),
        10,
        800
      ),
  }

  useEffect(() => {

    const canvas =
      canvasRef.current

    const root =
      rootRef.current

    if (!canvas || !root) return

    const gl =
      canvas.getContext(
        "webgl2",
        {
          antialias: false,
          alpha: false,
          depth: false,
          stencil: false,
        }
      )

    if (!gl) {

      console.error(
        `${NAME}: WebGL2 unavailable`
      )

      return
    }

    const field =
      createProgram(
        gl,
        FIELD_SRC,
        "field"
      )

    const finish =
      createProgram(
        gl,
        FINISH_SRC,
        "finish"
      )

    if (!field || !finish) return

    const fieldLocations =
      getLocations(
        gl,
        field,
        [
          "uRes",
          "uTime",
          "uC1",
          "uC2",
          "uSize",
          "uAngle",
        ]
      )

    const finishLocations =
      getLocations(
        gl,
        finish,
        [
          "uField",
          "uRes",
          "uTime",
          "uBg",
          "uPaper",
          "uMouse",
          "uOn",
          "uReach",
          "uCell",
        ]
      )

    const vao =
      gl.createVertexArray()

    gl.bindVertexArray(vao)

    const target =
      createFieldTarget(gl)

    const pointerTracker =
      trackPointer(root)

    const pointer =
      pointerTracker.pointer

    let mouseX = 0
    let mouseY = 0
    let hoverState = 0

    let animationFrame = 0
    let lastTime = -1
    let clock = 0

    const render = (now) => {

      animationFrame =
        requestAnimationFrame(render)

      const delta =
        lastTime < 0
          ? 0
          : clampN(
              (now - lastTime) / 1000,
              0,
              0.05
            )

      lastTime = now

      const values =
        valuesRef.current

      clock =
        (clock +
          delta *
          values.speed) %
        3600

      const dpr =
        Math.min(
          window.devicePixelRatio || 1,
          MAX_DPR
        )

      const canvasWidth =
        canvas.clientWidth || 1200

      const canvasHeight =
        canvas.clientHeight || 800

      const bufferWidth =
        Math.max(
          1,
          Math.round(
            canvasWidth * dpr
          )
        )

      const bufferHeight =
        Math.max(
          1,
          Math.round(
            canvasHeight * dpr
          )
        )

      if (
        canvas.width !== bufferWidth ||
        canvas.height !== bufferHeight
      ) {

        canvas.width = bufferWidth
        canvas.height = bufferHeight
      }

      target.resize(
        Math.max(
          1,
          Math.round(
            bufferWidth / 2
          )
        ),
        Math.max(
          1,
          Math.round(
            bufferHeight / 2
          )
        )
      )

      const present =
        pointer.inside ? 1 : 0

      if (
        present &&
        hoverState < 0.02
      ) {
        mouseX = pointer.tx
        mouseY = pointer.ty
      }

      hoverState +=
        (present - hoverState) *
        (
          1 -
          Math.exp(-delta * 5)
        )

      const smooth =
        1 -
        Math.exp(-delta * 16)

      mouseX +=
        (pointer.tx - mouseX) *
        smooth

      mouseY +=
        (pointer.ty - mouseY) *
        smooth

      const c1 =
        color(
          values.color1,
          DEFAULTS.color1
        )

      const c2 =
        color(
          values.color2,
          DEFAULTS.color2
        )

      const bg =
        color(
          values.background,
          DEFAULTS.background
        )

      const bgLum =
        0.2126 * bg[0] +
        0.7152 * bg[1] +
        0.0722 * bg[2]

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        target.framebuffer
      )

      gl.viewport(
        0,
        0,
        target.width(),
        target.height()
      )

      gl.useProgram(field)

      gl.uniform2f(
        fieldLocations.uRes,
        target.width(),
        target.height()
      )

      gl.uniform1f(
        fieldLocations.uTime,
        clock
      )

      gl.uniform3f(
        fieldLocations.uC1,
        c1[0],
        c1[1],
        c1[2]
      )

      gl.uniform3f(
        fieldLocations.uC2,
        c2[0],
        c2[1],
        c2[2]
      )

      gl.uniform1f(
        fieldLocations.uSize,
        values.size
      )

      gl.uniform1f(
        fieldLocations.uAngle,
        values.angle
      )

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        3
      )

      const scaleX =
        bufferWidth /
        canvasWidth

      const scaleY =
        bufferHeight /
        canvasHeight

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      )

      gl.viewport(
        0,
        0,
        bufferWidth,
        bufferHeight
      )

      gl.useProgram(finish)

      gl.activeTexture(
        gl.TEXTURE0
      )

      gl.bindTexture(
        gl.TEXTURE_2D,
        target.texture()
      )

      gl.uniform1i(
        finishLocations.uField,
        0
      )

      gl.uniform2f(
        finishLocations.uRes,
        bufferWidth,
        bufferHeight
      )

      gl.uniform1f(
        finishLocations.uTime,
        clock
      )

      gl.uniform3f(
        finishLocations.uBg,
        bg[0],
        bg[1],
        bg[2]
      )

      gl.uniform1f(
        finishLocations.uPaper,
        clampN(
          (bgLum - 0.35) / 0.3,
          0,
          1
        )
      )

      gl.uniform2f(
        finishLocations.uMouse,
        mouseX * scaleX,
        bufferHeight -
          mouseY * scaleY
      )

      gl.uniform1f(
        finishLocations.uOn,
        hoverState * values.hover
      )

      gl.uniform1f(
        finishLocations.uReach,
        values.reach * scaleY
      )

      gl.uniform1f(
        finishLocations.uCell,
        Math.max(
          2,
          Math.round(
            values.pixelSize * dpr
          )
        )
      )

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        3
      )
    }

    animationFrame =
      requestAnimationFrame(render)

    return () => {

      cancelAnimationFrame(
        animationFrame
      )

      pointerTracker.dispose()

      target.dispose()

      gl.deleteVertexArray(vao)

      gl.deleteProgram(field)

      gl.deleteProgram(finish)
    }

  }, [])

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background,
        width:
          typeof width === "number" &&
          width > 0
            ? width
            : "100%",
        height:
          typeof height === "number" &&
          height > 0
            ? height
            : "100%",
        minHeight: "100%",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  )
}

export default DitherBurn