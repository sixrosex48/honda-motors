import { useState } from 'react'
import { Link } from 'react-router-dom'
import DitherBurn from '../DitherBurn/DitherBurn'
import carImage from '../../assets/images/car.png'
import './Hero.css'

function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="inicio" className="hero">
      <div className="hero__background">
        <DitherBurn />
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">
          CONDUCE EL FUTURO
        </p>

        <h1 className="hero__title">
          Vive
          <br />
          el camino
          <br />
          diferente.
        </h1>

        <p className="hero__description">
          Descubre una nueva generación de rendimiento,
          tecnología y diseño.
        </p>

        <Link className="hero__button" to="/#modelos">
          Explorar modelos
        </Link>
      </div>

      <img
        className={`hero__car ${isHovered ? 'hero__car--active' : ''}`}
        src={carImage}
        alt="Automóvil deportivo"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </section>
  )
}

export default Hero
