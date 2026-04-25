import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import Validator from './pages/Validator';
import type { Page, Consultation } from './data/types';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import Groq from 'groq-sdk';
import { consultatii } from './data/mockData';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<Page>('dashboard');
  const [aiOutput, setAiOutput] = useState('');

  const [generatedConsultation, setGeneratedConsultation] =
    useState<Consultation>(consultatii[0]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const generateMedicalForm = async (finalTranscript: string) => {
    if (!finalTranscript.trim()) return;

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: `
Extrage informațiile din conversația medic-pacient și returnează STRICT JSON valid.
Nu folosi markdown. Nu scrie explicații.

Schema exactă:
{
  "id": 999,
  "pacient": "",
  "cnp": "",
  "varsta": 0,
  "data": "",
  "ora": "",
  "medic": "",
  "status": "In curs",
  "simptome": "",
  "diagnostic": "",
  "investigatii": "",
  "recomandari": ""
}

Reguli:
- Dacă nu știi o informație text, scrie "Nespecificat".
- Dacă nu știi vârsta, pune 0.
- Nu inventa CNP, nume, medic sau diagnostic.
- La diagnostic scrie doar ce este menționat de medic sau "Necesită validare medicală".
- Recomandările trebuie să fie doar cele menționate în conversație.

Conversație:
${finalTranscript}
            `,
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content || '{}';
      setAiOutput(raw);

      const cleanJson = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson) as Consultation;

      setGeneratedConsultation(parsed);
    } catch (error) {
      console.error('Error generating medical form:', error);
      alert('Eroare la generarea fișei.');
    }
  };

  const handleToggleRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Browserul nu suportă recunoașterea vocală.');
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsRecording(false);
      generateMedicalForm(transcript);
      return;
    }

    resetTranscript();
    setAiOutput('');

    SpeechRecognition.startListening({
      continuous: true,
      language: 'ro-RO',
    });

    setIsRecording(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <TopBar activeTab={activeTab} />

        <p>{transcript}</p>

        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {aiOutput}
        </pre>

        {activeTab === 'dashboard' && (
          <Dashboard
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            consultation={generatedConsultation}
          />
        )}

        {activeTab === 'consultatii' && <Consultations />}
        {activeTab === 'validator' && <Validator />}
      </main>
    </div>
  );
};

export default App;