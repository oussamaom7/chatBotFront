import React, { useState } from 'react';
import styles from '../styles/ChatInput.module.css';

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        placeholder="Type your message..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </button>
    </div>
  );
};

export default ChatInput;
