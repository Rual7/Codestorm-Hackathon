import RecorderCard from '../components/RecorderCard';
import ConsultationsCard from '../components/ConsultationsCard';
import MedicalFormPreview from '../components/MedicalFormPreview';
import ScrisoareMedicalaPreview from '../components/MedicalLetterPreview';
import BiletTrimiterePreview from '../components/MedicalSendLetterPreview';
import { useEffect, useState } from 'react';
import { consultatii, templates } from '../data/mockData';
import type { MedicalTemplate, Consultation } from '../data/types';
import jsPDF from 'jspdf';

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

  const dashboardMedic = 'Dr. Andrei Ionescu';

  const [currentConsultation, setCurrentConsultation] =
    useState<Consultation>({
      ...consultation,
      medic: dashboardMedic,
    });

  useEffect(() => {
    setCurrentConsultation({
      ...consultation,
      medic: dashboardMedic,
    });
  }, [consultation]);

  const handleFormSave = (updated: Consultation) => {
    setCurrentConsultation({
      ...updated,
      medic: dashboardMedic,
    });

    alert('Modificările au fost salvate ✅');
  };

  const handleSaveDocument = () => {
    const finalData: Consultation = {
      ...currentConsultation,
      medic: dashboardMedic,
    };

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('FISA DE CONSULTATIE MEDICALA', 20, 20);

    doc.setFontSize(11);

    let y = 35;

    doc.text('Unitate medicala: Clinica Demo', 20, y);
    y += 8;

    doc.text(`Medic: ${finalData.medic}`, 20, y);
    y += 8;

    doc.text(`Pacient: ${finalData.pacient || '-'}`, 20, y);
    y += 8;

    doc.text(`CNP: ${finalData.cnp || '-'}`, 20, y);
    y += 8;

    doc.text(
      `Varsta: ${
        finalData.varsta === 0 ? 'Nespecificat' : `${finalData.varsta} ani`
      }`,
      20,
      y
    );
    y += 8;

    doc.text(`Data: ${finalData.data || '-'}`, 20, y);
    y += 8;

    doc.text(`Ora: ${finalData.ora || '-'}`, 20, y);
    y += 12;

    doc.text('Simptome:', 20, y);
    y += 7;
    doc.text(doc.splitTextToSize(finalData.simptome || '-', 170), 20, y);
    y += 20;

    doc.text('Diagnostic:', 20, y);
    y += 7;
    doc.text(doc.splitTextToSize(finalData.diagnostic || '-', 170), 20, y);
    y += 20;

    doc.text('Investigatii:', 20, y);
    y += 7;
    doc.text(doc.splitTextToSize(finalData.investigatii || '-', 170), 20, y);
    y += 20;

    doc.text('Recomandari:', 20, y);
    y += 7;
    doc.text(doc.splitTextToSize(finalData.recomandari || '-', 170), 20, y);

    doc.save(`fisa-medicala-${finalData.pacient || 'pacient'}.pdf`);
  };

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

          <button className="btn-primary" onClick={handleSaveDocument}>
            Salvează documentul
          </button>
        </div>

        {selectedTemplate.id === 'scrisoare-medicala' ? (
          <ScrisoareMedicalaPreview consultation={currentConsultation} />
        ) : selectedTemplate.id === 'recomandare-investigatii' ? (
          <BiletTrimiterePreview consultation={currentConsultation} />
        ) : (
          <MedicalFormPreview
            consultation={currentConsultation}
            onSave={handleFormSave}
          />
        )}
      </div>
    </section>
  );
}