import { useEffect, useState } from 'react'
import './Models.css'
import { models } from './modelsData'
import DitherBurn from '../DitherBurn/DitherBurn'

const informationLabels = [
  ['Denominación', 'engineDesignation'],
  ['Tipo de motor', 'motorType'],
  ['Potencia', 'power'],
  ['Torque', 'torque'],
  ['Consumo', 'fuelConsumption'],
  ['Transmisión', 'transmission'],
  ['Tecnología / mecánica', 'technology'],
]

function ModelCard({ model, index, isExpanded, onToggle, onRequestInfo }) {
  const detailsId = `model-details-${index}`

  return (
    <article className={`model-card${isExpanded ? ' model-card--expanded' : ''}`}>
      <div className="model-card__image">
        <img
          src={model.image}
          alt={model.imageAlt || `Imagen conceptual para Honda ${model.name}`}
          loading="lazy"
        />
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
            <p className="model-card__details-label">
              FICHA CONCEPTUAL · DATOS DEMOSTRATIVOS, NO OFICIALES
            </p>
            <h4 className="model-card__details-title">{model.name}</h4>
            <p className="model-card__details-description">{model.detailDescription}</p>
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
              onClick={() => onRequestInfo(model)}
              tabIndex={isExpanded ? 0 : -1}
            >
              Probar este carro
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

  function requestModelInformation(model) {
    onRequestInfo(model)
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
