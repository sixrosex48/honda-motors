import DitherBurn from '../components/DitherBurn/DitherBurn'
import hondaCivicTypeR from '../assets/images/car.png'
import hondaCivicTypeRWhite from '../assets/images/car-2.png'
import civic2020Image from '../assets/images/20200111-HONDA-CIVIC-2020-AA01.png'
import crv2020Image from '../assets/images/20200211-HONDA-CR-V-2020-COLOMBIA-ADELANTO-01.png'
import crvAdvancedImage from '../assets/images/honda-cr-v-advanced-hybrid-colombia-2026-atras.png'
import hondaRentingImage from '../assets/images/Honda-Autos-Renting.png'
import { Link } from 'react-router-dom'
import './Nosotros.css'

const storyVideo = Object.values(
  import.meta.glob('../assets/videos/honda-story.mp4', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)[0]

const milestones = [
  {
    year: '1946',
    title: 'El origen',
    description: 'Soichiro Honda funda el Honda Technical Research Institute en Hamamatsu, Japón.',
  },
  {
    year: '1948',
    title: 'Nace Honda Motor',
    description: 'La compañía Honda Motor Co., Ltd. inicia una nueva etapa dedicada a la movilidad.',
  },
  {
    year: '1949',
    title: 'El primer sueño sobre ruedas',
    description: 'La Dream D-Type marca el inicio de la producción de motocicletas Honda.',
  },
  {
    year: '1963',
    title: 'Las cuatro ruedas',
    description: 'Honda presenta sus primeros automóviles de producción: el T360 y el S500.',
  },
  {
    year: '1972',
    title: 'Civic',
    description: 'El Civic llega al mundo con una visión práctica, eficiente y global.',
  },
  {
    year: '1989',
    title: 'Tecnología VTEC',
    description: 'Honda presenta VTEC, una innovación que une rendimiento y eficiencia.',
  },
  {
    year: 'Hoy',
    title: 'El movimiento continúa',
    description: 'Una búsqueda constante de nuevas formas de avanzar, también junto a Colombia.',
  },
]

const gallery = [
  {
    image: civic2020Image,
    alt: 'Honda Civic Type R azul visto de frente',
    title: 'El impulso',
    detail: 'El diseño y la puesta a punto trabajan en conjunto para ofrecer una respuesta ágil y una conducción que transmite confianza.',
  },
  {
    image: hondaCivicTypeRWhite,
    alt: 'Automóvil Honda blanco de perfil',
    title: 'La precisión',
    detail: 'Cada detalle, desde la dirección hasta el ajuste de sus componentes, aporta control y una sensación de manejo más precisa.',
  },
  {
    image: crvAdvancedImage,
    alt: 'Honda CR-V Advanced Hybrid 2026 vista trasera',
    title: 'La energía',
    detail: 'La potencia, la eficiencia y la respuesta mecánica se equilibran para acompañar distintos recorridos y necesidades de movilidad.',
  },
  {
    image: crv2020Image,
    alt: 'Honda CR-V 2020 para Colombia vista frontal',
    title: 'La evolución',
    detail: 'La evolución automotriz convierte años de aprendizaje en vehículos más refinados, cómodos y capaces de adaptarse al camino.',
  },
  {
    image: hondaRentingImage,
    alt: 'Vehículo Honda SUV gris',
    title: 'La innovación',
    detail: 'La tecnología ayuda a desarrollar vehículos cada vez más eficientes, seguros y conectados con las necesidades de sus conductores.',
  },
  {
    image: hondaCivicTypeRWhite,
    alt: 'Automóvil Honda blanco de alto rendimiento',
    title: 'El futuro',
    detail: 'Nuevas soluciones de ingeniería y movilidad abren posibilidades para viajar con mayor eficiencia, seguridad y libertad.',
  },
]

function Nosotros() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__background" aria-hidden="true">
          <DitherBurn />
        </div>
        <div className="about-hero__content">
          <p className="about-eyebrow">INGENIERÍA · INNOVACIÓN · MOVIMIENTO</p>
          <h1>Honda <span>Colombia</span></h1>
          <p className="about-hero__lead">
            Una historia de innovación, ingeniería y movimiento.
          </p>
          <a className="about-hero__scroll" href="#historia">
            Descubre nuestra historia <span aria-hidden="true">↓</span>
          </a>
        </div>
        <img
          className="about-hero__car"
          src={hondaCivicTypeR}
          alt="Honda Civic Type R azul"
          fetchPriority="high"
        />
        <div className="about-hero__index" aria-hidden="true">01 / 04</div>
      </section>

      <section id="historia" className="about-history">
        <div className="about-section-heading">
          <p className="about-eyebrow">UNA IDEA QUE SIGUE AVANZANDO</p>
          <h2>El camino <span>Honda.</span></h2>
          <p>
            De un pequeño instituto en Hamamatsu a una visión global de movilidad.
            Estos son algunos momentos que marcaron el recorrido.
          </p>
        </div>

        <ol className="about-timeline">
          {milestones.map((milestone, index) => (
            <li className="about-timeline__item" key={milestone.year}>
              <span className="about-timeline__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="about-timeline__card">
                <p className="about-timeline__year">{milestone.year}</p>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <a
          className="about-history__source"
          href="https://global.honda/en/about/history-digest/"
          rel="noreferrer"
        >
          Cronología basada en la historia corporativa de Honda
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="about-gallery">
        <div className="about-section-heading about-section-heading--gallery">
          <p className="about-eyebrow">DISEÑO QUE DEJA HUELLA</p>
          <h2>Una evolución <span>sobre ruedas.</span></h2>
          <p>Una mirada a la pasión por crear vehículos que conectan con las personas.</p>
        </div>

        <div className="about-gallery__grid">
          {gallery.map((item, index) => (
            <article
              className={`about-gallery__card about-gallery__card--${index + 1}`}
              key={`${item.title}-${index}`}
            >
              <div className="about-gallery__image">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-gallery__caption">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-film">
        <div className="about-section-heading about-section-heading--film">
          <p className="about-eyebrow">UNA PAUSA EN EL CAMINO</p>
          <h2>El movimiento <span>nos inspira.</span></h2>
        </div>
        <div className="about-film__frame">
          <video
            className="about-film__video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={hondaCivicTypeR}
            aria-label="Experiencia audiovisual Honda"
          >
            {storyVideo && <source src={storyVideo} type="video/mp4" />}
          </video>
          {!storyVideo && (
            <div className="about-film__placeholder">
              <span className="about-film__play" aria-hidden="true">▶</span>
              <p>Una historia en movimiento</p>
              <span>El video local se podrá añadir en src/assets/videos/honda-story.mp4</span>
            </div>
          )}
          <span className="about-film__duration">00:10 · HONDA STORY</span>
        </div>
      </section>

      <section className="about-finale">
        <div className="about-finale__glow" aria-hidden="true" />
        <p className="about-eyebrow">EL VIAJE CONTINÚA</p>
        <h2>Más de siete décadas <span>transformando la movilidad.</span></h2>
        <p className="about-finale__line">El futuro no se conduce. Se construye.</p>
        <Link className="about-finale__button" to="/#modelos">
          Explorar modelos <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  )
}

export default Nosotros
