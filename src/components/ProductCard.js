function ProductCard({ imageUrl, name, price, onAddToCart }) {
  const handleAddToCart = () => {
    console.log('ProductCard: handleAddToCart called for:', name);
    if (onAddToCart) {
      const product = { id: Date.now() + Math.random(), imageUrl, name, price };
      console.log('ProductCard: calling onAddToCart with:', product);
      onAddToCart(product);
      // Show a brief success message
      const button = document.querySelector(`[data-product="${name}"]`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#10b981';
        button.style.borderColor = '#10b981';
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.borderColor = '';
        }, 1000);
      }
    } else {
      alert(`${name} added to cart!`);
    }
  };

  return (
    <div className="card product-card">
      <img src={imageUrl} alt={name} />
      <div className="card-body">
                       <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                 <strong>{name}</strong>
                 <span className="muted">₹{(price * 83).toFixed(2)}</span>
               </div>
        <button 
          onClick={handleAddToCart}
          className="btn btn-small add-to-cart-btn"
          data-product={name}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;


