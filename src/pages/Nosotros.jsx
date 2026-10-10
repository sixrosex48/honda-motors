import DitherBurn from '../components/DitherBurn/DitherBurn'
import hondaCivicTypeR from '../assets/images/car.png'
import impulseImage from '../assets/images/impulso.jpg'
import precisionImage from '../assets/images/precision.avif'
import energyImage from '../assets/images/energia.jpg'
import evolutionImage from '../assets/images/evolucion.avif'
import innovationImage from '../assets/images/innovacion.avif'
import futureImage from '../assets/images/futuro.jpg'
import storyVideo from '../assets/images/video historia.mp4'
import { Link } from 'react-router-dom'
import './Nosotros.css'

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
    image: impulseImage,
    alt: 'Imagen asociada al concepto de impulso',
    title: 'El impulso',
    detail: 'El diseño y la puesta a punto trabajan en conjunto para ofrecer una respuesta ágil y una conducción que transmite confianza.',
  },
  {
    image: precisionImage,
    alt: 'Imagen asociada al concepto de precisión',
    title: 'La precisión',
    detail: 'Cada detalle, desde la dirección hasta el ajuste de sus componentes, aporta control y una sensación de manejo más precisa.',
  },
  {
    image: energyImage,
    alt: 'Imagen asociada al concepto de energía',
    title: 'La energía',
    detail: 'La potencia, la eficiencia y la respuesta mecánica se equilibran para acompañar distintos recorridos y necesidades de movilidad.',
  },
  {
    image: evolutionImage,
    alt: 'Imagen asociada al concepto de evolución',
    title: 'La evolución',
    detail: 'La evolución automotriz convierte años de aprendizaje en vehículos más refinados, cómodos y capaces de adaptarse al camino.',
  },
  {
    image: innovationImage,
    alt: 'Imagen asociada al concepto de innovación',
    title: 'La innovación',
    detail: 'La tecnología ayuda a desarrollar vehículos cada vez más eficientes, seguros y conectados con las necesidades de sus conductores.',
  },
  {
    image: futureImage,
    alt: 'Imagen asociada al concepto de futuro',
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
            loop
            playsInline
            controls
            preload="metadata"
            poster={hondaCivicTypeR}
            aria-label="Experiencia audiovisual Honda"
          >
            <source src={storyVideo} type="video/mp4" />
          </video>
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
