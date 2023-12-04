import { NavLink } from 'react-router-dom';
import './header.scss';

export default function Header() {
  return (
    <header>
      <div className="header conteiner">
        <nav className="navigation">
          <NavLink to="/">Main</NavLink>
          <NavLink to="/uncontrolled">edit uncontrol</NavLink>
          <NavLink to="/controlled">edit control</NavLink>
        </nav>
      </div>
    </header>
  );
}
