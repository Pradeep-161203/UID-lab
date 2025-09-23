import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const featured = [
  { id: 1, name: 'Classic Tee', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Denim Jacket', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Summer Dress', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop' }
];

function Home() {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product) => {
    console.log('Home: handleAddToCart called with:', product);
    addToCart(product);
  };
  
  console.log('Home component - cartItems:', cartItems);

  return (
    <div className="page">
      <div className="container hero">
        <div>
          <h1 className="hero-title">Elevate your everyday style</h1>
          <p className="hero-subtitle">Discover quality essentials and curated looks for every season.</p>
          <Link to="/products" className="btn">Shop now</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" alt="Fashion collection" style={{ borderRadius: 16, width: '100%', height: 'auto' }} />
      </div>

      <div className="container">
        <h2 className="section-title">Featured picks</h2>
        <div className="grid grid-3">
          {featured.map(item => (
            <ProductCard key={item.id} {...item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;


