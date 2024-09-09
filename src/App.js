// src/App.js
import React from "react";
import Chatbot from "./chatbot"; // Import the Chatbot component

function App() {
  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ticket Booking Chatbot</h1>
      <Chatbot /> {/* Call the Chatbot component */}
    </div>
  );
}

export default App;
