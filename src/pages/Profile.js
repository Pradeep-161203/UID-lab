import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from '../components/UserProfileCard';
import OrderHistory from '../components/OrderHistory';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Sample user data - in a real app, this would come from an API or context
const initialUserData = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Fashion Street',
    city: 'Style City',
    state: 'CA',
    zipCode: '90210'
  },
  preferences: {
    size: 'M',
    favoriteColor: 'Blue',
    style: 'Casual'
  },
  memberSince: '2023-01-15',
  totalOrders: 0,
  loyaltyPoints: 850
};

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
const USD_TO_INR = 83;

function Profile() {
  const { cartItems, getCartTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialUserData);
  const [saveStatus, setSaveStatus] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Update user data when auth user changes
  useEffect(() => {
    if (user) {
      const updatedUserData = {
        ...initialUserData,
        name: user.name,
        email: user.email,
        id: user.id
      };
      setUserData(updatedUserData);
      setEditedData(updatedUserData);
    }
  }, [user]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userProfileData');
    if (savedUserData) {
      try {
        const parsed = JSON.parse(savedUserData);
        setUserData(parsed);
        setEditedData(parsed);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }, []);

  // Update total orders based on cart items
  useEffect(() => {
    if (cartItems.length > 0) {
      setUserData(prev => ({ ...prev, totalOrders: prev.totalOrders + 1 }));
      setEditedData(prev => ({ ...prev, totalOrders: prev.totalOrders + 1 }));
    }
  }, [cartItems.length]);

  // Convert USD to INR
  const convertToRupees = (usdPrice) => {
    return (usdPrice * USD_TO_INR).toFixed(2);
  };

  // Generate order history from cart items
  const generateOrderHistory = () => {
    if (cartItems.length === 0) return [];
    
    const orderDate = new Date().toISOString().split('T')[0];
    const orderTotal = getCartTotal();
    
    return [{
      id: `ORD-${Date.now()}`,
      date: orderDate,
      status: 'Pending',
      total: orderTotal,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }];
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
    setSaveStatus(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData(userData);
    setSaveStatus(null);
  };

  const handleSaveProfile = () => {
    // Validate required fields
    if (!editedData.name.trim() || !editedData.email.trim()) {
      setSaveStatus({ type: 'error', message: 'Name and email are required!' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedData.email)) {
      setSaveStatus({ type: 'error', message: 'Please enter a valid email address!' });
      return;
    }

    // Save to localStorage (in a real app, this would be an API call)
    try {
      localStorage.setItem('userProfileData', JSON.stringify(editedData));
      setUserData(editedData);
      setIsEditing(false);
      setSaveStatus({ type: 'success', message: 'Profile updated successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save profile. Please try again.' });
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePreferencesChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>
        
        {/* Save Status Message */}
        {saveStatus && (
          <div className={`save-status ${saveStatus.type}`}>
            {saveStatus.message}
          </div>
        )}
        
        <div className="profile-layout">
          {/* User Profile Card - now with editable functionality */}
          <UserProfileCard 
            user={isEditing ? editedData : userData}
            isEditing={isEditing}
            onEditProfile={handleEditProfile}
            onCancelEdit={handleCancelEdit}
            onSaveProfile={handleSaveProfile}
            onInputChange={handleInputChange}
            onAddressChange={handleAddressChange}
            onPreferencesChange={handlePreferencesChange}
            convertToRupees={convertToRupees}
          />
          
          {/* Order History - now based on actual cart data */}
          <OrderHistory 
            orders={generateOrderHistory()}
            onViewOrder={(orderId) => alert(`Viewing order: ${orderId}`)}
            convertToRupees={convertToRupees}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
