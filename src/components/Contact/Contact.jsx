import { useState } from 'react'
import { models } from '../Models/modelsData'
import crvAdvancedImage from '../../assets/images/honda-cr-v-advanced-hybrid-colombia-2026-atras.png'
import './Contact.css'

function Contact({ requestedVehicle = null, onRequestedVehicleChange }) {
  const [selectedModel, setSelectedModel] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const selectedVehicle = requestedVehicle || models.find((model) => model.name === selectedModel)

  function handlePhoneChange(event) {
    const digits = event.target.value.replace(/\D/g, '')

    if (digits.length < 7 || digits.length > 15) {
      setPhoneError('Ingresa un teléfono con entre 7 y 15 dígitos.')
      event.target.setCustomValidity('Ingresa un teléfono con entre 7 y 15 dígitos.')
      return
    }

    setPhoneError('')
    event.target.setCustomValidity('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!event.currentTarget.reportValidity()) return

    const formData = Object.fromEntries(new FormData(event.currentTarget).entries())

    // Connect this validated payload to the contact API when a backend is available.
    void formData
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
    setPhoneError('')
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact__inner">
        <div className="contact__form-column">
          <p className="contact__eyebrow">HABLEMOS DE TU PRÓXIMO CAMINO</p>
          <h2 className="contact__title">
            Estamos para <span>ayudarte.</span>
          </h2>

          <div className="contact__form-stage">
            {submitted ? (
              <div className="contact__success" role="status" aria-live="polite">
                <span className="contact__success-mark" aria-hidden="true">✓</span>
                <p>
                  Gracias por registrarte en Honda Colombia,
                  <br />
                  nos pondremos en contacto contigo lo más pronto posible.
                </p>
                <button
                  className="contact__reset"
                  type="button"
                  onClick={handleReset}
                >
                  Volver al formulario
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__fields">
                  <label className="contact__field">
                    <span>Nombre completo</span>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      required
                    />
                  </label>

                  <label className="contact__field">
                    <span>Correo electrónico</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@correo.com"
                      required
                    />
                  </label>

                  <label className="contact__field">
                    <span>Número de teléfono</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+57 300 000 0000"
                      aria-describedby={phoneError ? 'contact-phone-error' : undefined}
                      onChange={handlePhoneChange}
                      required
                    />
                    {phoneError && (
                      <small id="contact-phone-error" className="contact__field-error">
                        {phoneError}
                      </small>
                    )}
                  </label>

                  <label className="contact__field">
                    <span>Ciudad</span>
                    <input
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Tu ciudad"
                      required
                    />
                  </label>

                  <label className="contact__field contact__field--full">
                    <span>Modelo de interés</span>
                    <select
                      name="model"
                      value={requestedVehicle?.name || selectedModel}
                      onChange={(event) => {
                        setSelectedModel(event.target.value)
                        onRequestedVehicleChange(null)
                      }}
                      required
                    >
                      <option value="">Selecciona un modelo</option>
                      {models.map((model) => (
                        <option value={model.name} key={model.name}>{model.name}</option>
                      ))}
                    </select>
                  </label>

                  <label className="contact__field contact__field--full">
                    <span>Mensaje</span>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Cuéntanos cómo podemos ayudarte"
                      required
                    />
                  </label>
                </div>

                <button className="contact__submit" type="submit">
                  Registrar <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="contact__visual">
          <div className="contact__visual-glow" aria-hidden="true" />
          <img
            src={selectedVehicle?.image || crvAdvancedImage}
            alt={
              selectedVehicle
                ? selectedVehicle.imageAlt || `Honda ${selectedVehicle.name}`
                : 'Honda CR-V Advanced Hybrid Colombia 2026, vista trasera'
            }
            loading="lazy"
            decoding="async"
          />
          <p>Ingeniería que conecta contigo.</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
