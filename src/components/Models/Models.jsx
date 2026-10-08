import { useEffect, useState } from 'react'
import './Models.css'
import carImage from '../../assets/images/car.png'
import carImageWhite from '../../assets/images/car-2.png'
import DitherBurn from '../DitherBurn/DitherBurn'

const models = [
  {
    name: 'Civic',
    category: 'SEDÁN',
    image: carImage,
    description: 'Diseño deportivo, tecnología avanzada y una experiencia de conducción excepcional.',
    motor: 'Opciones a combustión o híbridas, según versión',
    power: 'Configuración dependiente del mercado',
    transmission: 'Manual o automática, según versión',
    technology: 'Conectividad y asistencias disponibles según versión',
    highlight: 'Silueta deportiva y versátil',
  },
  {
    name: 'Accord',
    category: 'SEDÁN',
    image: carImage,
    description: 'Elegancia, confort y potencia para disfrutar cada trayecto con máxima comodidad.',
    motor: 'Opciones a combustión o híbridas, según versión',
    power: 'Configuración dependiente del mercado',
    transmission: 'Automática, según versión',
    technology: 'Conectividad y asistencias disponibles según versión',
    highlight: 'Confort con líneas sofisticadas',
  },
  {
    name: 'CR-V',
    category: 'SUV',
    image: carImage,
    description: 'Espacio, seguridad y tecnología para acompañarte en cada aventura.',
    motor: 'Opciones a combustión o híbridas, según versión',
    power: 'Configuración dependiente del mercado',
    transmission: 'Automática, según versión',
    technology: 'Conectividad y asistencias disponibles según versión',
    highlight: 'Espacio flexible para cada recorrido',
  },
  {
    name: 'HR-V',
    category: 'SUV COMPACTA',
    image: carImageWhite,
    description: 'Un formato urbano con espacio inteligente y estilo contemporáneo.',
    motor: 'Configuración según versión y mercado',
    power: 'Especificación dependiente del mercado',
    transmission: 'Disponible según versión',
    technology: 'Conectividad y asistencias según configuración',
    highlight: 'Diseño compacto y práctico',
  },
  {
    name: 'Pilot',
    category: 'SUV',
    image: carImage,
    description: 'Una SUV amplia pensada para compartir viajes y nuevos destinos.',
    motor: 'Configuración según versión y mercado',
    power: 'Especificación dependiente del mercado',
    transmission: 'Disponible según versión',
    technology: 'Conectividad y asistencias según configuración',
    highlight: 'Cabina espaciosa para viajar en compañía',
  },
  {
    name: 'City Hatchback',
    category: 'HATCHBACK',
    image: carImageWhite,
    description: 'Agilidad para la ciudad con una propuesta versátil y funcional.',
    motor: 'Configuración según versión y mercado',
    power: 'Especificación dependiente del mercado',
    transmission: 'Disponible según versión',
    technology: 'Conectividad y asistencias según configuración',
    highlight: 'Formato urbano y adaptable',
  },
  {
    name: 'Civic Type R',
    category: 'ALTO DESEMPEÑO',
    image: carImage,
    description: 'Carácter deportivo, ingeniería enfocada y una presencia inconfundible.',
    motor: 'Motor turbo, según generación y mercado',
    power: 'Especificación dependiente del mercado',
    transmission: 'Manual, según versión y mercado',
    technology: 'Tecnología orientada al rendimiento',
    highlight: 'Diseño aerodinámico de alto carácter',
  },
]

const informationLabels = [
  ['Motor', 'motor'],
  ['Potencia', 'power'],
  ['Transmisión', 'transmission'],
  ['Tecnología', 'technology'],
  ['Diseño', 'highlight'],
]

function ModelCard({ model, index, isExpanded, onToggle, onRequestInfo }) {
  const detailsId = `model-details-${index}`

  return (
    <article className={`model-card${isExpanded ? ' model-card--expanded' : ''}`}>
      <div className="model-card__image">
        <img src={model.image} alt={`Imagen conceptual para Honda ${model.name}`} loading="lazy" />
      </div>

      <div className="model-card__info">
        <p className="model-card__category">{model.category}</p>
        <h3 className="model-card__title">{model.name}</h3>
        <p className="model-card__description">{model.description}</p>

        <button
          className="model-card__button"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={onToggle}
        >
          {isExpanded ? 'Cerrar detalles' : 'Ver modelo'}
        </button>

        <div
          className={`model-card__details${isExpanded ? ' model-card__details--open' : ''}`}
          id={detailsId}
          aria-hidden={!isExpanded}
        >
          <div className="model-card__details-inner">
            <p className="model-card__details-label">FICHA CONCEPTUAL</p>
            <dl>
              {informationLabels.map(([label, key]) => (
                <div className="model-card__spec" key={key}>
                  <dt>{label}</dt>
                  <dd>{model[key]}</dd>
                </div>
              ))}
            </dl>
            <button
              className="model-card__contact"
              type="button"
              onClick={() => onRequestInfo(model.name)}
              tabIndex={isExpanded ? 0 : -1}
            >
              Solicitar información
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function Models({ onRequestInfo }) {
  const [expandedModel, setExpandedModel] = useState(null)
  const [visibleCount, setVisibleCount] = useState(() => {
    if (window.matchMedia('(max-width: 600px)').matches) return 1
    if (window.matchMedia('(max-width: 900px)').matches) return 2
    return 3
  })
  const [currentPage, setCurrentPage] = useState(0)
  const pageCount = Math.ceil(models.length / visibleCount)
  const activePage = Math.min(currentPage, pageCount - 1)
  const carouselGap = visibleCount === 1 ? 16 : 25

  function requestModelInformation(modelName) {
    onRequestInfo(modelName)
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 600px)')
    const tabletQuery = window.matchMedia('(max-width: 900px)')
    const updateVisibleCount = () => {
      setVisibleCount(mobileQuery.matches ? 1 : tabletQuery.matches ? 2 : 3)
    }

    mobileQuery.addEventListener('change', updateVisibleCount)
    tabletQuery.addEventListener('change', updateVisibleCount)

    return () => {
      mobileQuery.removeEventListener('change', updateVisibleCount)
      tabletQuery.removeEventListener('change', updateVisibleCount)
    }
  }, [])

  function changePage(direction) {
    setCurrentPage((page) => Math.max(0, Math.min(page + direction, pageCount - 1)))
  }

  return (
    <section id="modelos" className="models">
      <div className="models__background">
        <DitherBurn />
      </div>

      <div className="models__header">
        <p className="models__subtitle">
          NUESTROS MODELOS
        </p>

        <h2 className="models__title">
          Encuentra el auto
          <br />
          para tu camino.
        </h2>
      </div>

      <div className="models__carousel">
        <div className="models__carousel-controls" aria-label="Controles del carrusel de modelos">
          <button
            className="models__carousel-arrow"
            type="button"
            aria-label="Ver modelos anteriores"
            disabled={activePage === 0}
            onClick={() => changePage(-1)}
          >
            ←
          </button>
          <span className="models__carousel-page" aria-live="polite">
            {activePage + 1} / {pageCount}
          </span>
          <button
            className="models__carousel-arrow"
            type="button"
            aria-label="Ver modelos siguientes"
            disabled={activePage >= pageCount - 1}
            onClick={() => changePage(1)}
          >
            →
          </button>
        </div>

        <div className="models__carousel-viewport">
          <div
            className="models__grid"
            style={{
              transform: `translateX(calc(-${activePage * 100}% - ${activePage * carouselGap}px))`,
            }}
          >
            {models.map((model, index) => (
              <ModelCard
                key={model.name}
                model={model}
                index={index}
                isExpanded={expandedModel === model.name}
                onToggle={() => setExpandedModel((current) => (
                  current === model.name ? null : model.name
                ))}
                onRequestInfo={requestModelInformation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Models
