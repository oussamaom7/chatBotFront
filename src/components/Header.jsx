import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const onChatPage = location.pathname === '/chat';

  return (
    <header className={styles.header}>
      <div className={styles.brand}>CareerBot</div>
      <div className={styles.actions}>
        {onChatPage ? (
          <button className={styles.logout} onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className={styles.login} onClick={() => navigate('/login')}>Login</button>
            <button className={styles.signup} onClick={() => navigate('/register')}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
