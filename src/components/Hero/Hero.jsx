import { useState } from 'react'
import './Hero.css'
import carImage from '../../assets/images/car.png'
function Hero() {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <section id="inicio" className="hero">
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

        <button className="hero__button">
          Explorar modelos
        </button>
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

