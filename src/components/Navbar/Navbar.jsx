import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#inicio" className="navbar__logo">
        HONDA MOTORS
      </a>

      <ul className="navbar__links">
        <li>
          <a href="#inicio">Inicio</a>
        </li>

        <li>
          <a href="#modelos">Modelos</a>
        </li>

        <li>
          <a href="#nosotros">Nosotros</a>
        </li>

        <li>
          <a href="#contacto">Contacto</a>
        </li>
      </ul>

      <a href="#modelos" className="navbar__button">
        Ver modelos
      </a>
    </nav>
  )
}

export default Navbar