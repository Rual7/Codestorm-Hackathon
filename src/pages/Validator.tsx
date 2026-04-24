import { useState } from 'react';
import type { ValidationIssue } from '../data/types';

export default function Validator() {
  const [text, setText] = useState('');
  const [issues, setIssues] = useState<ValidationIssue[]>([]);

  function validate() {
    const result: ValidationIssue[] = [];
    const lower = text.toLowerCase();

    if (!lower.includes('nume')) {
      result.push({ id: 'name', title: 'Lipsește numele pacientului', description: 'Fișa trebuie să includă numele pacientului.', level: 'error' });
    }

    if (!lower.includes('simptome')) {
      result.push({ id: 'symptoms', title: 'Lipsește secțiunea simptome', description: 'Documentul trebuie să conțină simptomele raportate.', level: 'error' });
    }

    if (!lower.includes('recomand')) {
      result.push({ id: 'recommendations', title: 'Lipsesc recomandările', description: 'Fișa trebuie să includă recomandări sau pași următori.', level: 'warning' });
    }

    if (text.trim().length < 80) {
      result.push({ id: 'short', title: 'Document prea scurt', description: 'Conținutul pare incomplet.', level: 'warning' });
    }

    if (result.length === 0) {
      result.push({ id: 'ok', title: 'Document valid', description: 'Structura minimă este completă.', level: 'success' });
    }

    setIssues(result);
  }

  return (
    <section className="page-card">
      <h3>Validator document medical</h3>
      <p>Simulează verificarea structurii: pacient, simptome, diagnostic și recomandări.</p>

      <textarea
        placeholder="Lipește aici conținutul fișei medicale..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn-primary" onClick={validate}>Validează documentul</button>

      <div className="validation-list">
        {issues.map((issue) => (
          <div key={issue.id} className={`validation-card ${issue.level}`}>
            <h4>{issue.title}</h4>
            <p>{issue.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
