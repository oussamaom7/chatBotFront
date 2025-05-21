import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }
    // Login (fake/demo)
    const success = login({ email, password });
    if (success) {
      navigate('/chat');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="page-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      <div className="bg-glow-3"></div>
      <form className="login-card" autoComplete="on" onSubmit={handleSubmit}>

        <h2 className="login-heading">Welcome Back</h2>
        <p className="login-subheading">Sign in to your account to continue</p>
        {error && <div style={{color: '#f87171', marginBottom: 8, textAlign: 'center'}}>{error}</div>}
        <div className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" aria-label="Login">Sign In</button>
        </div>
        <div className="login-link">
          Don't have an account?{' '}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}