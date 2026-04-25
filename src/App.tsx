// App.tsx

import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleToggleRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browserul nu suportă recunoașterea vocală.');
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);

      console.log('Transcript final:', transcript);

      // aici folosești transcript-ul pentru AI //
      setInputValue(transcript);

      return;
    }

    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: 'ro-RO',
    });

    setIsRecording(true);
  };

  const [activeTab, setActiveTab] = useState<Page>('dashboard');

  return (
    <div className="dashboard-container">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

    <main className="main-content">
      <TopBar activeTab={activeTab} />

      <p>{transcript}</p>
      {/* Randarea condiționată a paginilor */}
      {activeTab === 'dashboard' && (
        <Dashboard isRecording={isRecording} onToggleRecording={handleToggleRecording} />
      )}
      {activeTab === 'consultatii' && <Consultations />}
      {activeTab === 'validator' && <Validator />}
    </main>
  </div>
)};

export default App;