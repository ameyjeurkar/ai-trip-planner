import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthPage.css';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock registration logic
    const name = e.target.name.value;
    const email = e.target.email.value;
    const profilePic = e.target['profile-pic'].files[0];

    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        login({ name, email, image: reader.result });
        navigate('/');
      };
      reader.readAsDataURL(profilePic);
    } else {
      login({ name, email, image: 'https://placehold.co/40x40' });
      navigate('/');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="profile-pic">Profile Picture</label>
            <input type="file" id="profile-pic" accept="image/*" />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
