import type { Consultation } from '../data/types';

type Props = {
  consultatii: Consultation[];
};

export default function ConsultationsCard({ consultatii }: Props) {
  return (
    <div className="card">
      <h3>Consultații programate</h3>
      <ul className="consult-list">
        {consultatii.map((c) => (
          <li key={c.id}>
            <span><strong>{c.ora}</strong> — {c.pacient}</span>
            <span className={`badge ${c.status.replaceAll(' ', '-').toLowerCase()}`}>{c.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
