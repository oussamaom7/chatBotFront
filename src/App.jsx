import React, { useState, useContext } from 'react';
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

  const handleSend = (text) => {
    setMessages([...messages, { sender: 'user', text }]);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'bot', text: "I'm here to assist you with your career!" }]);
    }, 600);
  };

  const handleSuggestion = (suggestion) => {
    handleSend(suggestion);
  };

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      overflow: 'hidden',
    }}>
      <ChatContainer messages={messages} />
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
  // const { isAuthenticated } = useContext(AuthContext);
  return (
    <MainLayout>
      <ChatbotUI />
    </MainLayout>
  );
}

function ChatPage() {
  // const { isAuthenticated } = useContext(AuthContext);
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
  return null; // App is now handled by RouterProvider in main.jsx
}

export default App
