function UserProfileCard({ 
  user, 
  isEditing, 
  onEditProfile, 
  onCancelEdit, 
  onSaveProfile,
  onInputChange,
  onAddressChange,
  onPreferencesChange,
  convertToRupees
}) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={user.avatar} 
          alt={`${user.name}'s profile`} 
          className="profile-avatar"
        />
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={user.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                className="profile-input profile-name-input"
                placeholder="Enter your name"
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                className="profile-input profile-email-input"
                placeholder="Enter your email"
              />
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                className="profile-input profile-phone-input"
                placeholder="Enter your phone"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <p className="profile-phone">{user.phone}</p>
            </>
          )}
          
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={onSaveProfile} className="btn btn-primary">
                  Save Changes
                </button>
                <button onClick={onCancelEdit} className="btn btn-outline">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={onEditProfile} className="btn btn-secondary">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-section">
          <h3>Address</h3>
          {isEditing ? (
            <div className="address-form">
              <input
                type="text"
                value={user.address.street}
                onChange={(e) => onAddressChange('street', e.target.value)}
                className="profile-input"
                placeholder="Street address"
              />
              <div className="address-row">
                <input
                  type="text"
                  value={user.address.city}
                  onChange={(e) => onAddressChange('city', e.target.value)}
                  className="profile-input"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={user.address.state}
                  onChange={(e) => onAddressChange('state', e.target.value)}
                  className="profile-input state-input"
                  placeholder="State"
                />
                <input
                  type="text"
                  value={user.address.zipCode}
                  onChange={(e) => onAddressChange('zipCode', e.target.value)}
                  className="profile-input zip-input"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          ) : (
            <>
              <p>{user.address.street}</p>
              <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
            </>
          )}
        </div>

        <div className="detail-section">
          <h3>Preferences</h3>
          {isEditing ? (
            <div className="preferences-form">
              <div className="preference-row">
                <label>Size:</label>
                <select
                  value={user.preferences.size}
                  onChange={(e) => onPreferencesChange('size', e.target.value)}
                  className="profile-select"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="preference-row">
                <label>Favorite Color:</label>
                <select
                  value={user.preferences.favoriteColor}
                  onChange={(e) => onPreferencesChange('favoriteColor', e.target.value)}
                  className="profile-select"
                >
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Green">Green</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Purple">Purple</option>
                  <option value="Pink">Pink</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
              <div className="preference-row">
                <label>Style:</label>
                <select
                  value={user.preferences.style}
                  onChange={(e) => onPreferencesChange('style', e.target.value)}
                  className="profile-select"
                >
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Sporty">Sporty</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Bohemian">Bohemian</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="preferences-grid">
              <div className="preference-item">
                <span className="preference-label">Size:</span>
                <span className="preference-value">{user.preferences.size}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Favorite Color:</span>
                <span className="preference-value">{user.preferences.favoriteColor}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Style:</span>
                <span className="preference-value">{user.preferences.style}</span>
              </div>
            </div>
          )}
        </div>

        <div className="detail-section">
          <h3>Account Info</h3>
          <div className="account-stats">
            <div className="stat-item">
              <span className="stat-label">Member Since:</span>
              <span className="stat-value">{new Date(user.memberSince).toLocaleDateString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Orders:</span>
              <span className="stat-value">{user.totalOrders}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Loyalty Points:</span>
              <span className="stat-value">{user.loyaltyPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
