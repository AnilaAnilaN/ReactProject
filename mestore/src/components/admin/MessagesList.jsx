import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MessagesList.css";

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setMessages([]);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="messages-list-container">
      <h2>User Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="messages-list">
          {messages.map((msg) => (
            <li key={msg._id} className="message-card">
              <div className="message-meta">
                <strong>{msg.name}</strong> ({msg.email})
              </div>
              <div className="message-content">{msg.message}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}