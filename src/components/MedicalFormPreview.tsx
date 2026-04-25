import { useEffect, useState } from "react";
import type { Consultation } from "../data/types";

type Props = {
  consultation: Consultation;
};

export default function MedicalFormPreview({ consultation }: Props) {
  const [data, setData] = useState(consultation);

  useEffect(() => {
    setData(consultation);
  }, [consultation]);

  function updateField(field: keyof Consultation, value: string) {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="medical-sheet">
      <div className="sheet-top">
        <div>
          <span>Unitate medicală</span>
          <strong>Clinica Demo</strong>
        </div>

        <div>
          <span>Medic</span>
          <strong
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateField("medic", e.currentTarget.innerText)}
          >
            {data.medic}
          </strong>
        </div>
      </div>

      <h3>FIȘĂ DE CONSULTAȚIE MEDICALĂ</h3>

      <div className="sheet-row">
        <label>Nume pacient</label>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateField("pacient", e.currentTarget.innerText)}
        >
          {data.pacient}
        </div>
      </div>

      <div className="sheet-grid">
        <div className="sheet-row">
          <label>CNP</label>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateField("cnp", e.currentTarget.innerText)}
          >
            {data.cnp}
          </div>
        </div>

        <div className="sheet-row">
          <label>Vârstă</label>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateField("varsta", e.currentTarget.innerText)}
          >
            {data.varsta} ani
          </div>
        </div>

        <div className="sheet-row">
          <label>Ora</label>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateField("ora", e.currentTarget.innerText)}
          >
            {data.ora}
          </div>
        </div>
      </div>

      <div className="sheet-row tall">
        <label>Simptome</label>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateField("simptome", e.currentTarget.innerText)}
        >
          {data.simptome}
        </div>
      </div>

      <div className="sheet-row tall">
        <label>Diagnostic preliminar</label>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateField("diagnostic", e.currentTarget.innerText)}
        >
          {data.diagnostic}
        </div>
      </div>

      <div className="sheet-row tall">
        <label>Recomandări</label>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateField("recomandari", e.currentTarget.innerText)}
        >
          {data.recomandari}
        </div>
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
          <tr>
            <td>1</td>
            <td>{data.investigatii}</td>
            <td>{data.recomandari}</td>
            <td>Conform consultației</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Consult specialist</td>
            <td>Opțional</td>
            <td>Dacă simptomele persistă</td>
          </tr>
        </tbody>
      </table>

      <button className="btn-primary">Salvează modificările</button>
    </div>
  );
}