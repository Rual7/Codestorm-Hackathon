import type { Consultation, MedicalTemplate } from './types';

export const consultatii: Consultation[] = [
  {
    id: 1,
    pacient: 'Ion Popescu',
    cnp: '1900101123456',
    varsta: 34,
    ora: '10:30',
    medic: 'Dr. Andrei Ionescu',
    status: 'In asteptare',
    simptome: 'Febră, tuse seacă, dureri musculare de 2 zile.',
    diagnostic: 'Suspiciune infecție respiratorie acută.',
    recomandari: 'Hidratare, repaus, antitermic la nevoie, consult dacă simptomele se agravează.',
  },
  {
    id: 2,
    pacient: 'Maria Ionescu',
    cnp: '2850505456789',
    varsta: 39,
    ora: '12:00',
    medic: 'Dr. Andrei Ionescu',
    status: 'Finalizat',
    simptome: 'Durere toracică ușoară, palpitații ocazionale.',
    diagnostic: 'Necesită investigații cardiologice suplimentare.',
    recomandari: 'EKG, analize sânge, programare cardiologie.',
  },
  {
    id: 3,
    pacient: 'Alexandru Stan',
    cnp: '1760311987654',
    varsta: 48,
    ora: '14:15',
    medic: 'Dr. Andrei Ionescu',
    status: 'In curs',
    simptome: 'Durere lombară după efort fizic.',
    diagnostic: 'Lombalgie mecanică probabilă.',
    recomandari: 'Repaus relativ, antiinflamator local, reevaluare dacă persistă.',
  },
];

export const templates: MedicalTemplate[] = [
  { id: 1, name: 'Fișă de Consultație Medicală', description: 'Model general pentru consultații de medicină de familie.' },
  { id: 2, name: 'Scrisoare Medicală', description: 'Sumar medical pentru pacient sau medic specialist.' },
  { id: 3, name: 'Recomandare Investigații', description: 'Document pentru analize, EKG, radiografie sau alte investigații.' },
];
