import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
const USD_TO_INR = 83;

const convertToRupees = (usdPrice) => {
  return (usdPrice * USD_TO_INR).toFixed(2);
};

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  console.log('Cart component - cartItems:', cartItems);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            <h2>Cart Items ({cartItems.length})</h2>
            
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                                     <p className="cart-item-price">₹{convertToRupees(item.price)}</p>
                  
                  <div className="cart-item-quantity">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                                           <p className="cart-item-total">
                           Total: ₹{convertToRupees(item.price * item.quantity)}
                         </p>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
                               <div className="summary-row">
                     <span>Subtotal:</span>
                     <span>₹{convertToRupees(calculateSubtotal())}</span>
                   </div>

                   <div className="summary-row">
                     <span>Tax (8%):</span>
                     <span>₹{convertToRupees(calculateTax())}</span>
                   </div>

                   <div className="summary-row total">
                     <span>Total:</span>
                     <span>₹{convertToRupees(calculateTotal())}</span>
                   </div>
            
            <button 
              onClick={handleCheckout}
              className="btn checkout-btn"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
            
            <button 
              onClick={clearCart}
              className="btn btn-outline clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
