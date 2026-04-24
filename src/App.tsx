// App.tsx

import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import DocumentPage from './pages/DocumentPage';
import Templates from './pages/Templates';
import Validator from './pages/Validator';
import type { Page } from './data/types';

import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useState } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  prompt: string;
  response: string;
}

const App = () => {
  // State to manage the input value
  const [inputValue, setInputValue] = useState('');
  // State to manage chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Function to handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const chatPrompt = `You: ${inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: inputValue,
          },
        ],
        model: 'llama-3.1-8b-instant',
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      // Add the new chat message to the chat messages
      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage = 'Error fetching chat completion';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      // Add the error message to the chat messages
      setChatMessages([...chatMessages, newChatMessage]);
    } finally {
      // Clear the input field
      setInputValue('');
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action (newline)
      handleSend();
    }
  }
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<Page>('dashboard');

    const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  return (
    <div className="dashboard-container">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

    <main className="main-content">
      <TopBar activeTab={activeTab} />

      {/* Secțiunea de control voce */}
      <div className="voice-interface">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>

      <hr />

      {/* Randarea condiționată a paginilor */}
      {activeTab === 'dashboard' && (
        <Dashboard isRecording={isRecording} setIsRecording={setIsRecording} />
      )}
      {activeTab === 'consultatii' && <Consultations />}
      {activeTab === 'document' && <DocumentPage />}
      {activeTab === 'template-uri' && <Templates />}
      {activeTab === 'validator' && <Validator />}
    </main>
  </div>
)};

export default App;