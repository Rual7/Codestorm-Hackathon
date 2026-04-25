import RecorderCard from '../components/RecorderCard';
import ConsultationsCard from '../components/ConsultationsCard';
import MedicalFormPreview from '../components/MedicalFormPreview';
import ScrisoareMedicalaPreview from '../components/MedicalLetterPreview';
import BiletTrimiterePreview from '../components/MedicalSendLetterPreview';
import { useState } from 'react';
import { consultatii, templates } from '../data/mockData';
import type { MedicalTemplate, Consultation } from '../data/types';

type Props = {
  isRecording: boolean;
  onToggleRecording: () => void;
  consultation: Consultation;
};

export default function Dashboard({
  isRecording,
  onToggleRecording,
  consultation,
}: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<MedicalTemplate>(
    templates[0]
  );

  return (
    <section className="content-grid">
      <RecorderCard
        isRecording={isRecording}
        onToggleRecording={onToggleRecording}
      />

      <ConsultationsCard consultatii={consultatii} />

      <div className="card wide-card">
        <div className="card-header-row">
          <div>
            <h3>Alege șablonul documentului</h3>
            <p>
              Preview-ul de mai jos se modifică în funcție de șablonul selectat.
            </p>
          </div>
        </div>

        <div className="template-grid">
          {templates.map((template) => (
            <div
              className={`template-card ${
                selectedTemplate.id === template.id ? 'selected-template' : ''
              }`}
              key={template.id}
            >
              <h4>{template.name}</h4>
              <p>{template.description}</p>

              <button
                className={
                  selectedTemplate.id === template.id
                    ? 'btn-primary'
                    : 'btn-secondary'
                }
                onClick={() => setSelectedTemplate(template)}
              >
                {selectedTemplate.id === template.id
                  ? 'Șablon selectat'
                  : 'Folosește șablon'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card wide-card">
        <div className="card-header-row">
          <div>
            <h3>{selectedTemplate.name}</h3>
            <p>
              Document completat de AI. Doctorul poate modifica manual câmpurile
              dacă există erori.
            </p>
          </div>

          <button className="btn-primary">Salvează documentul</button>
        </div>

        {selectedTemplate.id === 'scrisoare-medicala' ? (
          <ScrisoareMedicalaPreview consultation={consultation} />
        ) : selectedTemplate.id === 'recomandare-investigatii' ? (
          <BiletTrimiterePreview consultation={consultation} />
        ) : (
          <MedicalFormPreview consultation={consultation} />
        )}
      </div>
    </section>
  );
}