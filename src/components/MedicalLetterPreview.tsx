import type { Consultation } from '../data/types';

type Props = {
  consultation: Consultation;
};

export default function ScrisoareMedicalaPreview({ consultation }: Props) {
  return (
    <div className="medical-sheet letter-sheet">
      <div className="letter-line">
        Cabinet medical din ambulatoriul de specialitate / spital <span />
      </div>
      <div className="letter-line">
        Medic <span />
      </div>
      <div className="letter-line">
        Specialitate <span />
      </div>

      <h3>SCRISOARE MEDICALĂ</h3>

      <div className="letter-line full">
        Domnului/ Doamnei Dr. (adresa cabinetului medical) <span />
      </div>

      <p>Stimate(ă) coleg(ă),</p>

      <div className="letter-line full">
        Vă informăm că pacientul dumneavoastră{' '}
        <strong>{consultation.pacient}</strong> <span />
      </div>

      <div className="letter-line">
        CNP <span /> născut la data de <span />
      </div>

      <div className="letter-line">
        a fost consultat în serviciul nostru la data de{' '}
        <strong>{consultation.data}</strong>
      </div>

      <div className="letter-line full">
        Diagnostic: <strong>{consultation.diagnostic}</strong>
      </div>

      <div className="letter-line full">
        Investigații: <strong>{consultation.investigatii}</strong>
      </div>

      <div className="letter-section-title">Medicație prescrisă</div>

      <table className="letter-table">
        <thead>
          <tr>
            <th>Medicament</th>
            <th>Dimineața</th>
            <th>Prânz</th>
            <th>Seara</th>
            <th>Observații</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{consultation.tratament}</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr><td /><td /><td /><td /><td /></tr>
          <tr><td /><td /><td /><td /><td /></tr>
          <tr><td /><td /><td /><td /><td /></tr>
          <tr><td /><td /><td /><td /><td /></tr>
        </tbody>
      </table>

      <div className="letter-footer">
        <span>Data</span>
        <span>Semnătura și parafa</span>
      </div>
    </div>
  );
}