import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [activeMethod, setActiveMethod] = useState('UPI');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bank: '',
  });
  const navigate = useNavigate();

  const handleMethodChange = (method) => {
    setActiveMethod(method);
  };

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    // Mock payment processing
    alert('Payment Successful!');
    navigate('/confirmation');
  };

  const renderPaymentForm = () => {
    switch (activeMethod) {
      case 'UPI':
        return (
          <div className="form-group">
            <label htmlFor="upiId">UPI ID</label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              placeholder="yourname@upi"
              value={paymentDetails.upiId}
              onChange={handleChange}
            />
          </div>
        );
      case 'Cards':
        return (
          <>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="**** **** **** ****"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="***"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        );
      case 'NetBanking':
        return (
          <div className="form-group">
            <label htmlFor="bank">Select Bank</label>
            <select id="bank" name="bank" value={paymentDetails.bank} onChange={handleChange}>
              <option>Select a bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-page">
      <h2>Secure Payment</h2>
      <div className="payment-form">
        <div className="payment-methods">
          <button
            onClick={() => handleMethodChange('UPI')}
            className={`payment-method ${activeMethod === 'UPI' ? 'active' : ''}`}
          >
            UPI
          </button>
          <button
            onClick={() => handleMethodChange('Cards')}
            className={`payment-method ${activeMethod === 'Cards' ? 'active' : ''}`}
          >
            Cards
          </button>
          <button
            onClick={() => handleMethodChange('NetBanking')}
            className={`payment-method ${activeMethod === 'NetBanking' ? 'active' : ''}`}
          >
            NetBanking
          </button>
        </div>
        {renderPaymentForm()}
        <button onClick={handlePayment} className="pay-now-button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
