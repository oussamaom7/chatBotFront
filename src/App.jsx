import React, { useState, useContext } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import SuggestionRow from './components/SuggestionRow';
import ChatInput from './components/ChatInput';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';
import './styles/globals.css';

function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am CareerBot. How can I help you today?' },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsBotTyping(true);
    try {
      const response = await axios.post('http://localhost:8081/chat', { question: text });
      const data = response.data;
      setMessages(prev => [
        ...prev.filter(m => m.sender !== 'typing'),
        { sender: 'bot', text: data.answer || data }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.filter(m => m.sender !== 'typing'),
        { sender: 'bot', text: 'Sorry, there was a problem connecting to the server.' }
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion);
  };

  const displayMessages = isBotTyping
    ? [...messages, { sender: 'typing', text: '...' }]
    : messages;

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden',
    }}>
      <ChatContainer messages={displayMessages} />
      <SuggestionRow onSuggestion={handleSuggestion} />
      <ChatInput onSend={handleSend} />
    </main>
  );
}

// Data router configuration for React Router v6.4+

const MainLayout = ({ children }) => (
  <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg)'}}>
    <Header />
    {children}
  </div>
);

function HomePage() {
  
  return (
    <MainLayout>
      <ChatbotUI />
    </MainLayout>
  );
}

function ChatPage() {
 
  return (
    <MainLayout>
      <ChatbotUI />
    </MainLayout>
  );
}

function LoginPage() {
  return (
    <MainLayout>
      <Login />
    </MainLayout>
  );
}

function RegisterPage() {
  return (
    <MainLayout>
      <Register />
    </MainLayout>
  );
}

const routes = [
  { path: '/', element: <LoginPage /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return null; 
}

export default App
