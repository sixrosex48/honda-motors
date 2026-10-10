import { useEffect, useState } from 'react'
import './Models.css'
import carImage from '../../assets/images/car.png'
import carImageWhite from '../../assets/images/car-2.png'
import civic2020Image from '../../assets/images/20200111-HONDA-CIVIC-2020-AA01.png'
import crv2020Image from '../../assets/images/20200211-HONDA-CR-V-2020-COLOMBIA-ADELANTO-01.png'
import DitherBurn from '../DitherBurn/DitherBurn'

// Especificaciones conceptuales de ejemplo; no son datos oficiales de Honda.
const models = [
  {
    name: 'Civic',
    category: 'SEDÁN',
    image: civic2020Image,
    imageAlt: 'Honda Civic 2020 Type R azul',
    description: 'Diseño deportivo, tecnología avanzada y una experiencia de conducción excepcional.',
    detailDescription: 'Un compacto de carácter deportivo que combina respuesta ágil, control preciso y comodidad para el uso diario.',
    engineDesignation: '2.0 Turbo Sport',
    motorType: '4 cilindros, turbo a gasolina',
    power: 'Aproximadamente 280 hp',
    torque: 'Aproximadamente 295 lb-ft',
    fuelConsumption: 'Aproximadamente 11–13 km/L combinado',
    transmission: 'Manual de 6 velocidades',
    technology: 'Diferencial de deslizamiento limitado para mejorar la tracción.',
  },
  {
    name: 'Accord',
    category: 'SEDÁN',
    image: carImage,
    description: 'Elegancia, confort y potencia para disfrutar cada trayecto con máxima comodidad.',
    detailDescription: 'Un sedán de enfoque refinado, pensado para ofrecer viajes cómodos, respuesta progresiva y eficiencia equilibrada.',
    engineDesignation: '1.5 Turbo Touring',
    motorType: '4 cilindros, turbo a gasolina',
    power: 'Aproximadamente 192 hp',
    torque: 'Aproximadamente 192 lb-ft',
    fuelConsumption: 'Aproximadamente 13–16 km/L combinado',
    transmission: 'Automática CVT',
    technology: 'Modos de conducción para adaptar la respuesta del vehículo.',
  },
  {
    name: 'CR-V',
    category: 'SUV',
    image: crv2020Image,
    imageAlt: 'Honda CR-V 2020 para Colombia',
    description: 'Espacio, seguridad y tecnología para acompañarte en cada aventura.',
    detailDescription: 'Una SUV versátil con cabina amplia y una configuración híbrida conceptual para combinar desempeño y eficiencia.',
    engineDesignation: '2.0 e:HEV',
    motorType: 'Híbrido: 4 cilindros y motores eléctricos',
    power: 'Aproximadamente 204 hp combinados',
    torque: 'Aproximadamente 247 lb-ft combinados',
    fuelConsumption: 'Aproximadamente 16–19 km/L combinado',
    transmission: 'e-CVT',
    technology: 'Gestión híbrida que alterna entre propulsión eléctrica y de combustión.',
  },
  {
    name: 'HR-V',
    category: 'SUV COMPACTA',
    image: carImageWhite,
    description: 'Un formato urbano con espacio inteligente y estilo contemporáneo.',
    detailDescription: 'Una SUV compacta diseñada para moverse con facilidad en la ciudad, con una posición de manejo elevada y un interior flexible.',
    engineDesignation: '2.0 i-VTEC',
    motorType: '4 cilindros atmosférico a gasolina',
    power: 'Aproximadamente 158 hp',
    torque: 'Aproximadamente 138 lb-ft',
    fuelConsumption: 'Aproximadamente 13–16 km/L combinado',
    transmission: 'Automática CVT',
    technology: 'Asistencia de estabilidad y modos de conducción seleccionables.',
  },
  {
    name: 'Pilot',
    category: 'SUV',
    image: carImage,
    description: 'Una SUV amplia pensada para compartir viajes y nuevos destinos.',
    detailDescription: 'Una SUV familiar de tres filas que prioriza la amplitud, la comodidad en carretera y una entrega de potencia suave.',
    engineDesignation: '3.5 V6 Adventure',
    motorType: 'V6 atmosférico a gasolina',
    power: 'Aproximadamente 285 hp',
    torque: 'Aproximadamente 262 lb-ft',
    fuelConsumption: 'Aproximadamente 9–11 km/L combinado',
    transmission: 'Automática de 10 velocidades',
    technology: 'Control de tracción para mejorar el avance en superficies variables.',
  },
  {
    name: 'City Hatchback',
    category: 'HATCHBACK',
    image: carImageWhite,
    description: 'Agilidad para la ciudad con una propuesta versátil y funcional.',
    detailDescription: 'Un hatchback compacto y práctico, con dimensiones ágiles para la ciudad y espacio adaptable para el día a día.',
    engineDesignation: '1.5 i-VTEC Urban',
    motorType: '4 cilindros atmosférico a gasolina',
    power: 'Aproximadamente 121 hp',
    torque: 'Aproximadamente 107 lb-ft',
    fuelConsumption: 'Aproximadamente 15–18 km/L combinado',
    transmission: 'Automática CVT',
    technology: 'Asientos traseros abatibles para ampliar el espacio de carga.',
  },
]

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
