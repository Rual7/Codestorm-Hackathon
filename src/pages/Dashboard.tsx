import RecorderCard from '../components/RecorderCard';
import ConsultationsCard from '../components/ConsultationsCard';
import MedicalFormPreview from '../components/MedicalFormPreview';
import { consultatii } from '../data/mockData';


type Props = {
  isRecording: boolean;
  onToggleRecording: () => void;
};

export default function Dashboard({ isRecording, onToggleRecording }: Props) {
  const activeConsultation = consultatii[0];

  return (
    <section className="content-grid">
      <RecorderCard isRecording={isRecording} onToggleRecording={onToggleRecording} />
      <ConsultationsCard consultatii={consultatii} />
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
