import type { Consultation } from '../data/types';

type Props = {
  consultation: Consultation;
};

export default function MedicalFormPreview({ consultation }: Props) {
  return (
    <div className="medical-sheet">
      <div className="sheet-top">
        <div>
          <span>Unitate medicală</span>
          <strong>Clinica Demo</strong>
        </div>
        <div>
          <span>Medic</span>
          <strong>{consultation.medic}</strong>
        </div>
      </div>

      <h3>FIȘĂ DE CONSULTAȚIE MEDICALĂ</h3>

      <div className="sheet-row">
        <label>Nume pacient</label>
        <div>{consultation.pacient}</div>
      </div>

      <div className="sheet-grid">
        <div className="sheet-row"><label>CNP</label><div>{consultation.cnp}</div></div>
        <div className="sheet-row"><label>Vârstă</label><div>{consultation.varsta} ani</div></div>
        <div className="sheet-row"><label>Ora</label><div>{consultation.ora}</div></div>
      </div>

      <div className="sheet-row tall">
        <label>Simptome</label>
        <div>{consultation.simptome}</div>
      </div>

      <div className="sheet-row tall">
        <label>Diagnostic preliminar</label>
        <div>{consultation.diagnostic}</div>
      </div>

      <div className="sheet-row tall">
        <label>Recomandări</label>
        <div>{consultation.recomandari}</div>
      </div>

      <table className="sheet-table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Investigație</th>
            <th>Recomandare</th>
            <th>Observații</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Analize sânge</td><td>La nevoie</td><td>Conform simptomelor</td></tr>
          <tr><td>2</td><td>Consult specialist</td><td>Opțional</td><td>Dacă simptomele persistă</td></tr>
        </tbody>
      </table>
    </div>
  );
}
