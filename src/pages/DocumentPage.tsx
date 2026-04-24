import { useState } from 'react';
import MedicalFormPreview from '../components/MedicalFormPreview';
import { consultatii } from '../data/mockData';

export default function DocumentPage() {
  const [selectedId, setSelectedId] = useState(consultatii[0].id);
  const selected = consultatii.find((c) => c.id === selectedId) ?? consultatii[0];

  return (
    <section className="page-card">
      <div className="card-header-row">
        <div>
          <h3>Fișă de consultație medicală</h3>
          <p>Model inspirat din formularul atașat, pregătit pentru completare automată.</p>
        </div>

        <select value={selectedId} onChange={(e) => setSelectedId(Number(e.target.value))}>
          {consultatii.map((c) => (
            <option key={c.id} value={c.id}>{c.pacient}</option>
          ))}
        </select>
      </div>

      <MedicalFormPreview consultation={selected} />
    </section>
  );
}
