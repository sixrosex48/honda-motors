import './Models.css'
import carImage from '../../assets/images/car.png'

function Models() {
  return (
    <section id="modelos" className="models">

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

      <div className="models__grid">

        <article className="model-card">
          <div className="model-card__image">
            <img
              src={carImage}
              alt="Honda Civic"
            />
          </div>

          <div className="model-card__info">
            <p className="model-card__category">
              SEDÁN
            </p>

            <h3 className="model-card__title">
              Civic
            </h3>

            <p className="model-card__description">
              Diseño deportivo, tecnología avanzada
              y una experiencia de conducción excepcional.
            </p>

            <button className="model-card__button">
              Ver modelo
            </button>
          </div>
        </article>

        <article className="model-card">
          <div className="model-card__image">
            <img
              src={carImage}
              alt="Honda Accord"
            />
          </div>

          <div className="model-card__info">
            <p className="model-card__category">
              SEDÁN
            </p>

            <h3 className="model-card__title">
              Accord
            </h3>

            <p className="model-card__description">
              Elegancia, confort y potencia para disfrutar
              cada trayecto con máxima comodidad.
            </p>

            <button className="model-card__button">
              Ver modelo
            </button>
          </div>
        </article>

        <article className="model-card">
          <div className="model-card__image">
            <img
              src={carImage}
              alt="Honda CR-V"
            />
          </div>

          <div className="model-card__info">
            <p className="model-card__category">
              SUV
            </p>

            <h3 className="model-card__title">
              CR-V
            </h3>

            <p className="model-card__description">
              Espacio, seguridad y tecnología para
              acompañarte en cada aventura.
            </p>

            <button className="model-card__button">
              Ver modelo
            </button>
          </div>
        </article>

      </div>

    </section>
  )
}

export default Models