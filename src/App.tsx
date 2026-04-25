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
Extrage informațiile medicale din transcriere și returnează STRICT JSON valid.
Nu folosi markdown. Nu scrie explicații. Nu adăuga câmpuri în plus.

Schema exactă:
{
  "pacient": "",
  "cnp": "",
  "varsta": 0,
  "simptome": "",
  "diagnostic": "",
  "investigatii": "",
  "recomandari": "",
  "observatii": ""
}

Reguli:
- Returnează doar JSON valid parsabil cu JSON.parse().
- Păstrează exact cheile din schema de mai sus.
- Dacă nu știi o informație text, scrie "Nespecificat".
- Dacă nu știi vârsta, pune 0.
- Nu inventa CNP, nume pacient sau diagnostic.
- La "diagnostic", scrie doar diagnosticul menționat explicit de medic.
- Dacă nu există diagnostic clar, scrie "Necesită validare medicală".
- La "investigatii", scrie doar investigațiile menționate explicit.
- La "recomandari", scrie doar recomandările sau tratamentul menționat explicit.
- Nu transforma simptomele în diagnostic.
- Nu adăuga recomandări din cunoștințele tale.

Conversație:
${finalTranscript}
            `,
          },
        ],
      });

      const raw = completion.choices[0]?.message?.content || '{}';
      const cleanJson = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson) as Partial<Consultation>;

      const now = new Date();

      const currentDate = now.toLocaleDateString('ro-RO'); // 25.04.2026
      const currentTime = now.toLocaleTimeString('ro-RO', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setGeneratedConsultation((prev) => ({
        ...prev,
        ...parsed,
        data: currentDate,
        ora: currentTime,
}));

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