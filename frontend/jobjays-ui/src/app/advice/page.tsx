'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello there! My name is Jay, how may I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To show a loading indicator

  const router = useRouter();


  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    // Update the messages state with the user's message
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare the conversation history for the API
      const conversation = [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        ...messages.map((message) => ({
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.text,
        })),
        {
          role: 'user',
          content: input.trim(),
        },
      ];

      // Send the conversation to the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      

      const data = await response.json();

      const assistantReply = {
        id: messages.length + 2,
        sender: 'assistant',
        text: data.assistantMessage.content.trim(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantReply]);
    } catch (error) {
      console.error('Error fetching assistant reply:', error);
      // Handle error (e.g., display a message to the user)
      const errorReply = {
        id: messages.length + 2,
        sender: 'assistant',
        text: "I'm sorry, but I couldn't process your request at this time.",
      };
      setMessages((prevMessages) => [...prevMessages, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 flex items-center">
      <button
        onClick={() => router.back()}
        className="mr-4 text-white font-semibold focus:outline-none"
      >
        &larr; 
      </button>
      <h1 className="text-xl font-semibold">Advice from Jay</h1>
    </header>


      {/* Chat messages */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            {/* Assistant icon */}
            {message.sender === 'assistant' && (
              <img
                src="/jay.jpg"
                alt="Assistant Icon"
                className="w-14 h-14 rounded-full mr-2"
              />
            )}

            {/* Message bubble */}
            <div
              className={`max-w-md p-5 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>

            {/* User icon */}
            {message.sender === 'user' && (
              <img
                src="/user.jpg"
                alt="User Icon"
                className="w-14 h-14 rounded-full ml-2"
              />
            )}
          </div>
        ))}

        {/* Loading status */}
        {isLoading && (
          <div className="flex justify-center mb-4">
            <div className="loader"></div>
          </div>
        )}
      </main>

      {/* Prompt input field */}
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
                e.preventDefault();
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
