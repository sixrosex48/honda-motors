import carImage from '../../assets/images/car-2.png'
import { useEffect, useState } from 'react'
import './WhyChooseUs.css'

function WhyChooseUs() {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    {
      threshold: 0.3,
    }
  )

  const section = document.querySelector('.why-us')

  if (section) {
    observer.observe(section)
  }

  return () => {
    observer.disconnect()
  }
}, [])
  return (
    <section className="why-us">
      <div className="why-us__content">
        <p className="why-us__subtitle">
          POR QUÉ ELEGIRNOS
        </p>

        <h2 className="why-us__title">
          Diseñado para ir
          <br />
          más allá.
        </h2>

        <p className="why-us__description">
          Tecnología, rendimiento y diseño se combinan
          para crear una experiencia de conducción diferente.
        </p>
      </div>

      <div className="why-us__visual">
       <img
          className={`why-us__car ${isVisible ? 'why-us__car--visible' : ''}`}
          src={carImage}
          alt="Automóvil"
        />
      </div>
    </section>
  )
}

export default WhyChooseUs