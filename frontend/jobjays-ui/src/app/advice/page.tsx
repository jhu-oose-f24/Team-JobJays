'use client';

import React, { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'assistant', text: 'Hello there! How may I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    // Static assistant reply
    const assistantReply = {
      id: messages.length + 2,
      sender: 'assistant',
      text: "I'm sorry, but I can't process that request right now.",
    };

    setMessages([...messages, userMessage, assistantReply]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-semibold">JobJays Guide</h1>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            {/* Display the assistant's icon on the left */}
            {message.sender === 'assistant' && (
              <img
                src="/jay.jpg" // Replace with your assistant icon path
                alt="Assistant Icon"
                className="w-14 h-14 rounded-full mr-2"
              />
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-md p-5 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>

            {/* Display the user's icon on the right */}
            {message.sender === 'user' && (
              <img
                src="/user.jpg" // Replace with your user icon path
                alt="User Icon"
                className="w-14 h-14 rounded-full ml-2"
              />
            )}
          </div>
        ))}
      </main>

      {/* Input Field */}
      <footer className="p-4 bg-white">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevents the default action (e.g., form submission)
                handleSend();
              }
            }}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
            onClick={handleSend}
            disabled={input.trim() === ''}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
