import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import styles from '../styles/ChatContainer.module.css';

const ChatContainer = ({ messages }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer} ref={chatRef}>
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>
      <div className="bg-glow-3"></div>
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} {...msg} />
      ))}
    </div>
  );
};

export default ChatContainer;
