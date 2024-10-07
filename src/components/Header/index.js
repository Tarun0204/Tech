import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <Link to="/">
        <div className="header">
          <img
            className="logo-img"
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </div>
      </Link>
    )
  }
}

export default Header
