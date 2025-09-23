function OrderHistory({ orders, onViewOrder, convertToRupees }) {
  if (orders.length === 0) {
    return (
      <div className="order-history">
        <h2>Order History</h2>
        <div className="empty-orders">
          <div className="empty-orders-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make your first purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2>Order History ({orders.length})</h2>
      
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-header">
            <div className="order-info">
              <h3 className="order-id">{order.id}</h3>
              <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">₹{convertToRupees(order.total)}</span>
            </div>
          </div>
          
          <div className="order-items">
            <h4>Items:</h4>
            {order.items.map((item, index) => (
              <div key={index} className="order-item-detail">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">₹{convertToRupees(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onViewOrder(order.id)} 
            className="btn btn-small view-order-btn"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
