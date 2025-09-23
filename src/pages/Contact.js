import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-description">
          Have questions or need assistance? We'd love to hear from you. 
          Send us a message and we'll respond as soon as possible.
        </p>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div>
                  <h3>Address</h3>
                  <p>123 Fashion Street<br />Style City, CA 90210</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>hello@auroraclothing.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="contact-method">
                <div className="contact-icon">🕒</div>
                <div>
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button 
                type="submit" 
                className="btn submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
