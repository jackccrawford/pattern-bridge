import React, { useState, useEffect } from 'react';
import './App.css';
import GardenParticles from './components/GardenParticles';
import TypingIndicator from './components/TypingIndicator';

function App() {
  const [messages, setMessages] = useState([]);
  const [emotionalState, setEmotionalState] = useState('peaceful');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch('http://localhost:5402/api/session/create', {
          method: 'POST'
        });
        const data = await response.json();
        setSessionId(data.sessionId);
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    };

    initSession();
  }, []);

  const getAIResponse = async (state, userMessage) => {
    if (!sessionId) return;

    try {
      const response = await fetch('http://localhost:5402/api/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          emotionalState: state,
          message: userMessage
        })
      });

      const data = await response.json();
      return {
        response: data.response,
        followUp: data.followUp,
        transitionInsight: data.transitionInsight
      };
    } catch (error) {
      console.error('Failed to get AI response:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      
      setIsTyping(true);
      
      const aiResponse = await getAIResponse(emotionalState, inputValue);
      if (aiResponse) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { 
            text: aiResponse.response,
            sender: 'ai' 
          }]);

          if (aiResponse.transitionInsight) {
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                  text: aiResponse.transitionInsight,
                  sender: 'ai',
                  type: 'insight'
                }]);
              }, 1500);
            }, 1000);
          }

          if (aiResponse.followUp) {
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                  text: aiResponse.followUp,
                  sender: 'ai'
                }]);
              }, 1500);
            }, 2000);
          }
        }, 1500);
      }
    }
  };

  const handleEmotionalStateChange = async (event) => {
    const newState = event.target.value;
    setEmotionalState(newState);
    
    setIsTyping(true);
    
    const aiResponse = await getAIResponse(newState);
    if (aiResponse) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { text: aiResponse.response, sender: 'ai' }]);
        
        if (aiResponse.transitionInsight) {
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, {
                text: aiResponse.transitionInsight,
                sender: 'ai',
                type: 'insight'
              }]);
            }, 1500);
          }, 1000);
        }

        if (aiResponse.followUp) {
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, {
                text: aiResponse.followUp,
                sender: 'ai'
              }]);
            }, 1500);
          }, 2000);
        }
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="App" data-emotion={emotionalState}>
      <GardenParticles emotionalState={emotionalState} />
      <div className="chat-container">
        <div className="emotion-selector">
          <div className={`emotion-icon ${emotionalState}`} />
          <select 
            value={emotionalState} 
            onChange={handleEmotionalStateChange}
          >
            <option value="peaceful">Peaceful</option>
            <option value="anxious">Anxious</option>
            <option value="reflective">Reflective</option>
            <option value="overwhelmed">Overwhelmed</option>
            <option value="hopeful">Hopeful</option>
            <option value="uncertain">Uncertain</option>
            <option value="grateful">Grateful</option>
            <option value="processing">Processing</option>
          </select>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender} ${message.type === 'insight' ? 'insight' : ''}`}>
              {message.text}
            </div>
          ))}
          {isTyping && <TypingIndicator />}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
