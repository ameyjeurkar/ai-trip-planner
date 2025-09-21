import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CartPage.css';

// Helper to generate a mock cart from a plan
const generateMockCart = (plan) => {
  if (!plan) return null;

  const experiences = plan.itinerary?.flatMap(day => day.activities);

  return {
    ...plan,
    items: {
      Flights: { name: 'Indigo 6E-204', cost: 8000 },
      Hotels: { name: 'Taj Fort Aguada', cost: 15000 },
      Experiences: experiences.map(exp => ({ name: exp.title, cost: exp.cost })),
    }
  };
};

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const planFromState = location.state?.plan;
  const cart = generateMockCart(planFromState);

  const handleProceedToPayment = () => {
    navigate('/booking', { state: { plan: cart } });
  };

  if (!cart) {
    return (
      <div className="cart-page">
        <h1>Trip Summary</h1>
        <p>No items in your cart. Please create a plan first.</p>
      </div>
    );
  }

  const totalCost = Object.values(cart.items).reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc + item.reduce((sum, exp) => sum + exp.cost, 0);
    }
    return acc + item.cost;
  }, 0);

  return (
    <div className="cart-page">
      <h1>Trip Summary</h1>
      <div className="trip-summary-card">
        <div className="summary-item">
          <h4>Flights</h4>
          <p>{cart.items.Flights.name} - ₹{cart.items.Flights.cost}</p>
        </div>
        <div className="summary-item">
          <h4>Hotels</h4>
          <p>{cart.items.Hotels.name} - ₹{cart.items.Hotels.cost}</p>
        </div>
        <div className="summary-item">
          <h4>Experiences</h4>
          {cart.items.Experiences.map((exp, index) => (
            <p key={index}>{exp.name} - ₹{exp.cost}</p>
          ))}
        </div>
      </div>

      <div className="price-breakdown">
        <h3>Price Breakdown</h3>
        <div className="price-item">
          <span>Flights</span>
          <span>₹{cart.items.Flights.cost}</span>
        </div>
        <div className="price-item">
          <span>Hotels</span>
          <span>₹{cart.items.Hotels.cost}</span>
        </div>
        <div className="price-item">
          <span>Experiences</span>
          <span>₹{cart.items.Experiences.reduce((sum, exp) => sum + exp.cost, 0)}</span>
        </div>
        <div className="price-total">
          <span>Total</span>
          <span>₹{totalCost}</span>
        </div>
      </div>

      <div className="smart-swap">
        <h4>✨ Smart Swap</h4>
        <p>Save ₹2000 by swapping to a similar, cheaper hotel.</p>
        <button>Swap & Save</button>
      </div>

      <button onClick={handleProceedToPayment} className="book-button">
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartPage;
