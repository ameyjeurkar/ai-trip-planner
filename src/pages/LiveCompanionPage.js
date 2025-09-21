import React, { useState, useEffect, useRef } from 'react';
import './LiveCompanionPage.css';

const LiveCompanionPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! As your AI companion, I can help you with real-time suggestions, translations, and more. How can I assist you?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('restaurant') || lowerInput.includes('food') || lowerInput.includes('eat')) {
      return 'Of course! Looking for nearby restaurants. Are you interested in a specific cuisine?';
    }
    if (lowerInput.includes('translate')) {
      return 'I can help with that. What phrase would you like me to translate?';
    }
    if (lowerInput.includes('emergency') || lowerInput.includes('help')) {
      return 'I am here to help. For immediate assistance, please use the Emergency Help button. Otherwise, let me know what you need.';
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello there! How can I make your trip better?';
    }
    // Default responses
    const responses = [
      'That sounds interesting. Let me find some information for you.',
      'I can certainly look into that. Give me just a moment.',
      'I understand. I am searching for the best options for you now.',
      'Great question! Let me pull up the details for you.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse = getBotResponse(inputValue);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' },
        ]);
        setIsTyping(false);
      }, 1500); // Simulate thinking time

      setInputValue('');
    }
  };

  return (
    <div className="live-companion-page">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about your trip..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
          <button className="voice-assistant-button">🎙️</button>
        </div>
      </div>
      <div className="quick-actions">
        <button>Nearby Restaurants</button>
        <button>Translate Menu</button>
        <button>Emergency Help</button>
      </div>
      <div className="multilingual-toggle">
        <button>English</button>
        <button>हिन्दी</button>
        <button>தமிழ்</button>
      </div>
    </div>
  );
};

export default LiveCompanionPage;
