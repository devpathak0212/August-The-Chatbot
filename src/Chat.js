// src/Chat.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function loadHistory() {
      if (!userId) return;
      try {
        const docRef = doc(db, "chats", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setMessages(docSnap.data().history);
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }
    loadHistory();
  }, [userId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, user_id: userId }),
      });

      const data = await res.json();
      const botResponse = data.response;
      const updatedMessages = [...messages, { user: input, bot: botResponse }];

      setMessages(updatedMessages);
      await setDoc(doc(db, "chats", userId), { history: updatedMessages });
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("userId");
    window.location.href = "/signin";
  };

  return (
    <div className="chat-wrapper d-flex flex-column">
      <div className="chat-header d-flex justify-content-between align-items-center p-3">
        <h5 className="m-0 text-white we">aug</h5>
        <button className="logout text-aut btn-light btn-sm " onClick={handleLogout}>LogOut</button>
      </div>

      <div className="text-aut chat-box flex-grow-1 p-3">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div className="message user-msg">{msg.user}</div>
            <div className="message bot-msg">{msg.bot}</div>
          </div>
        ))}
      </div>

      <div className="text-aut chat-input d-flex p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="form-control me-2"
        />
        <button className="text-aut btn-autumn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
