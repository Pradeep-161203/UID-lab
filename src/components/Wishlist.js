function Wishlist({ 
  items, 
  isEditing, 
  onEditWishlist, 
  onCancelEdit, 
  onSaveWishlist,
  onRemoveItem, 
  onAddToCart, 
  onItemChange,
  onAddItem,
  onRemoveItemEdit,
  convertToRupees
}) {
  if (items.length === 0 && !isEditing) {
    return (
      <div className="wishlist">
        <h2>My Wishlist</h2>
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">💝</div>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you'd like to save for later!</p>
          <button onClick={onEditWishlist} className="btn">
            Add Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <h2>My Wishlist ({items.length})</h2>
        <div className="wishlist-actions">
          {isEditing ? (
            <>
              <button onClick={onSaveWishlist} className="btn btn-primary">
                Save Changes
              </button>
              <button onClick={onCancelEdit} className="btn btn-outline">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={onEditWishlist} className="btn btn-secondary">
              Edit Wishlist
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="wishlist-edit-controls">
          <button onClick={onAddItem} className="btn btn-small">
            + Add New Item
          </button>
        </div>
      )}

      <div className="wishlist-items">
        {items.map((item, index) => (
          <div key={item.id} className="wishlist-item">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="wishlist-item-image"
            />
            
            <div className="wishlist-item-details">
              {isEditing ? (
                <div className="wishlist-edit-form">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => onItemChange(index, 'name', e.target.value)}
                    className="wishlist-input"
                    placeholder="Item name"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => onItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                    className="wishlist-input"
                    placeholder="Price in USD"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="url"
                    value={item.imageUrl}
                    onChange={(e) => onItemChange(index, 'imageUrl', e.target.value)}
                    className="wishlist-input"
                    placeholder="Image URL"
                  />
                </div>
              ) : (
                <>
                  <h3 className="wishlist-item-name">{item.name}</h3>
                  <p className="wishlist-item-price">₹{convertToRupees(item.price)}</p>
                </>
              )}
            </div>

            <div className="wishlist-item-actions">
              {isEditing ? (
                <button 
                  onClick={() => onRemoveItemEdit(index)} 
                  className="btn btn-small btn-danger"
                  title="Remove item"
                >
                  ×
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => onAddToCart(item.id)} 
                    className="btn btn-small add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => onRemoveItem(item.id)} 
                    className="btn btn-small btn-outline remove-btn"
                    title="Remove from wishlist"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditing && items.length === 0 && (
        <div className="empty-wishlist-edit">
          <p>No items in your wishlist. Click "Add New Item" to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
