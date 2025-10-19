import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="navbar-logo">💰</span>
          <span>FinanceTracker</span>
        </NavLink>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/add">
              ➕ Add Transaction
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions">
              📋 Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics">
              📈 Analytics
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;