import type { Consultation } from '../data/types';

type Props = {
  consultation: Consultation;
};

export default function BiletTrimiterePreview({ consultation }: Props) {
  return (
    <div className="medical-sheet referral-sheet">
      <div className="referral-annex">ANEXA Nr. 9</div>

      <div className="referral-line">
        Județul <span /> 200... luna <span /> ziua <span />
      </div>
      <div className="referral-line">
        Localitatea <span />
      </div>
      <div className="referral-line">
        Unitatea sanitară <span />
      </div>

      <h3>BILET DE TRIMITERE</h3>

      <div className="referral-line center-line">
        Către <span />
      </div>

      <div className="referral-line">
        Numele <strong>{consultation.pacient}</strong> Prenumele <span />
      </div>

      <div className="referral-line">
        Sexul <span /> în vârstă de <strong>{consultation.varsta}</strong> ani,
        cu domiciliul în:
      </div>

      <div className="referral-line">
        Județul <span /> localitatea <span />
      </div>

      <div className="referral-line">
        str. <span /> nr. <span />
      </div>

      <div className="referral-line">
        Diagnostic prezumtiv <strong>{consultation.diagnostic}</strong>
      </div>

      <div className="referral-line">
        Motivul trimiterii <strong>{consultation.simptome}</strong>
      </div>

      <div className="referral-line tall-dots">
        Investigații și tratamente <strong>{consultation.investigatii}</strong>
      </div>

      <div className="referral-signature">
        Semnătura și parafa medicului,
        <div />
      </div>
    </div>
  );
}