'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        sendMessage({ text: input });
        setInput('');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🦁 Animal Facts Chatbot</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`p-3 rounded-lg ${
              message.role === 'user' ? 'border border-blue-600 ml-auto max-w-[80%]' : 'border border-orange-400 mr-auto max-w-[80%]'
            }`}>
            <strong>{message.role === 'user' ? 'You: ' : '🐾 AI: '}</strong>
            {message.parts.map((part, index) =>
              part.type === 'text' ? <span key={index}>{part.text}</span> : null,
            )}
          </div>
        ))}
      </div>

      <form
        className="px-4 py-3"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <div className="flex-1">
          <div className="flex rounded-2xl border border-slate-700 px-4 py-2 focus-within:border-orange-400 transition-colors"
            style={{ backgroundColor: '#0f172a' }}
          >
            <textarea
              id="user-input"
              name="user-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status !== 'ready'}
              className="w-full bg-transparent text-sm resize-none focus:outline-none"
              placeholder="Ask your question about animals..."
            />
            <button type="submit" disabled={status !== 'ready' || input.trim() === ''} className='rounded-xl border p-2 hover:bg-orange-400 hover:text-white hover:cursor-pointer'>
              Submit
            </button>
          </div>
          <p
            className="text-[10px] text-slate-500 mt-1"
          >
            Press Enter to send · Shift + Enter for new line
          </p>
        </div>

        {/* <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Say something..."
        /> */}

      </form>
    </div>
  );
}
