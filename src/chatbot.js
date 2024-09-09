import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [message, setMessage] = useState(''); // To hold the user input
  const [conversation, setConversation] = useState([]); // To hold the conversation history

  // Function to send the message to the backend
  const handleSendMessage = async () => {
    if (message.trim()) {
      // Update the conversation state with the user's message
      setConversation([...conversation, { sender: 'user', text: message }]);

      try {
        // Send the message to the Node.js backend
        const res = await axios.post('https://backendchatbot-mpsk.onrender.com/webhook', { message });

        // Update the conversation with the bot's response
        const botResponse = res.data.fulfillmentText;
        setConversation([...conversation, { sender: 'user', text: message }, { sender: 'bot', text: botResponse }]);

        // Clear the input field
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        setConversation([...conversation, { sender: 'user', text: message }, { sender: 'bot', text: 'Error communicating with the bot.' }]);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
      <h3>ChatBot</h3>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
        {/* Render the conversation history */}
        {conversation.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input box for typing message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: 'calc(100% - 50px)', padding: '10px' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px', width: '50px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatBot;
