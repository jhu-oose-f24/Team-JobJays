'use client';

import ReactMarkdown from 'react-markdown';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Import an icon for the back button

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello there! How may I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Define the predefined prompts
  const prompts = [
    'Out of all the jobs posted, which one is best suited for me?',
    'How can I prepare for a technical interview?',
    'Which of my saved jobs would be best suited for me?',
    'Can you help me practice common interview questions?',
  ];

  // Reference to the end of the messages list
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Initialize the router
  const router = useRouter();

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle prompt clicks
  const handlePromptClick = async (promptText: string) => {
    if (promptText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: promptText.trim(),
    };

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
          content: promptText.trim(),
        },
      ];

      const token = localStorage.getItem('token');
      // Send the conversation to the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
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

      const token = localStorage.getItem('token');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-300 p-4 flex items-center">
          {/* Back Button */}
          <button
              className="mr-2 p-2 text-gray-600 hover:text-gray-800"
              onClick={() => router.back()}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img src="/jay.jpg" alt="Assistant Icon" className="w-8 h-8 rounded-full mr-2" />
          <h1 className="text-lg font-semibold text-gray-800">JobJays Guide</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Display prompts if only the initial assistant message is present */}
          {messages.length === 1 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
                  Quick Suggestions
                </h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {prompts.map((prompt, index) => (
                      <button
                          key={index}
                          onClick={() => handlePromptClick(prompt)}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 text-gray-700"
                      >
                        {prompt}
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* Chat Messages */}
          {messages.map((message) => (
              <div
                  key={message.id}
                  className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
              >
                {/* Assistant Message */}
                {message.sender === 'assistant' && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img
                            src="/jay.jpg"
                            alt="Assistant Icon"
                            className="w-8 h-8 rounded-full mr-2"
                        />
                      </div>
                      <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md max-w-xl">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    </div>
                )}

                {/* User Message */}
                {message.sender === 'user' && (
                    <div className="flex items-end">
                      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-xl">
                        {message.text}
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <img
                            src="/user.jpg"
                            alt="User Icon"
                            className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                )}
              </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
              <div className="flex justify-center mb-4">
                <div className="loader"></div>
              </div>
          )}
          {/* Dummy div to keep scroll at the bottom */}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Field */}
        <footer className="p-4 bg-white border-t border-gray-300">
          <div className="flex items-center">
            <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
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
