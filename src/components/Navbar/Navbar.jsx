import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        HONDA MOTORS
      </Link>

      <ul className="navbar__links">
        <li>
          <Link to="/">Inicio</Link>
        </li>

        <li>
          <Link to="/#modelos">Modelos</Link>
        </li>

        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>

        <li>
          <Link to="/#contacto">Contacto</Link>
        </li>
      </ul>

      <Link to="/#modelos" className="navbar__button">
        Ver modelos
      </Link>
    </nav>
  )
}

export default Navbar