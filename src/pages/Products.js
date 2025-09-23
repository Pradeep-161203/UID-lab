import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Relaxed Hoodie', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Slim Jeans', price: 54.99, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Linen Shirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Chino Pants', price: 44.99, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Pleated Skirt', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Leather Belt', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop' }
];

function Products() {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product) => {
    console.log('Products: handleAddToCart called with:', product);
    addToCart(product);
  };
  
  console.log('Products component - cartItems:', cartItems);

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">All products</h1>
        <div className="grid grid-3">
          {products.map(p => (
            <ProductCard key={p.id} {...p} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;


