import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Profile from './pages/Profile';
import CalculatorPage from './pages/Calculator';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Counter from './pages/Counter';
import Items from './pages/Items';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/items" element={<Items />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
