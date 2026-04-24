import RecorderCard from '../components/RecorderCard';
import ConsultationsCard from '../components/ConsultationsCard';
import MedicalFormPreview from '../components/MedicalFormPreview';
import { consultatii } from '../data/mockData';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Props = {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
};

export default function Dashboard({ isRecording, setIsRecording }: Props) {
  const activeConsultation = consultatii[0];

const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <section className="content-grid">
      <RecorderCard isRecording={isRecording} setIsRecording={setIsRecording} />
      <ConsultationsCard consultatii={consultatii} />
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
      <div className="card wide-card">
        <div className="card-header-row">
          <div>
            <h3>Document auto-completat de AI</h3>
            <p>Fișa este generată pe baza consultației selectate.</p>
          </div>
          <button className="btn-primary">Salvează documentul</button>
        </div>
        <MedicalFormPreview consultation={activeConsultation} />
      </div>
    </section>
  );
}
