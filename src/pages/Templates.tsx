import { templates } from '../data/mockData';

export default function Templates() {
  return (
    <section className="page-card">
      <h3>Șabloane documente</h3>
      <p>Selectează un model de document pentru generarea fișei.</p>

      <div className="template-grid">
        {templates.map((template) => (
          <div className="template-card" key={template.id}>
            <h4>{template.name}</h4>
            <p>{template.description}</p>
            <button className="btn-secondary">Folosește șablon</button>
          </div>
        ))}
      </div>
    </section>
  );
}
