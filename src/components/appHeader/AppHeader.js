import { Link, NavLink } from 'react-router-dom'
import './appHeader.scss'

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        {/* <a href="#">
                    <span>Marvel</span> information portal
                </a> */}
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink exact activeStyle={{ color: '#9f0012' }} to="/characters">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink activeStyle={{ color: '#9f0012' }} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
