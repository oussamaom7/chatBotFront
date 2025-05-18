import React from 'react';
import styles from '../styles/MessageBubble.module.css';

const MessageBubble = ({ sender, text }) => (
  <div
    className={
      sender === 'user' ? styles.userBubble : styles.botBubble
    }
  >
    {text}
  </div>
);

export default MessageBubble;
