import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = getCartCount();
  
  console.log('Navbar - cartCount:', cartCount);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">Hogwarts Clothing</Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/calculator">Calculator</NavLink>
          <NavLink to="/items">Items</NavLink>
          <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <div className="user-menu">
                <span className="user-name">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <NavLink to="/cart" className="cart-link">
            🛒 Cart {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


