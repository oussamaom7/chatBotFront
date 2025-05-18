import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Basic validation
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Register user (fake/demo)
    const success = register({ fullName, email, password, role });
    if (success) {
      navigate('/login');
    } else {
      setError('Registration failed');
    }
  };

  return (
    <div className="page-container">
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      <div className="bg-glow-3"></div>
      <form className="login-card" autoComplete="on" onSubmit={handleSubmit}>
        
        <h2 className="login-heading" style={{fontSize: '15px', marginBottom: '4px'}}>Create Your Account</h2>
        <p className="login-subheading" style={{fontSize: '12px', marginBottom: '8px'}}>Sign up to start chatting</p>
        {error && <div style={{color: '#f87171', marginBottom: 8, textAlign: 'center'}}>{error}</div>}
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 0}}>
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              aria-label="Full Name"
              className="login-input"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              className="login-input"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative" style={{marginBottom: 12}}>
            <label htmlFor="role" style={{display: 'block', marginBottom: 6, color: 'var(--color-accent, #38BDF8)', fontWeight: 600, letterSpacing: 0.5}}>Register as:</label>
            <select
              id="role"
              className="login-input"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button
            type="submit"
            className="login-button"
            aria-label="Sign Up"
            style={{marginTop: 8, marginBottom: 4}}
          >
            Create Account
          </button>
        </div>
        <div className="login-link">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
