import { consultatii } from '../data/mockData';

export default function Consultations() {
  return (
    <section className="page-card">
      <h3>Toate consultațiile</h3>
      <p>Aici poate fi selectată o consultație pentru generarea fișei medicale.</p>

      <div className="table-list">
        {consultatii.map((c) => (
          <div className="table-row" key={c.id}>
            <span>{c.pacient}</span>
            <span>{c.ora}</span>
            <span>{c.medic}</span>
            <span className={`badge ${c.status.replaceAll(' ', '-').toLowerCase()}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
