export type Page = 'dashboard' | 'consultatii' | 'validator';

export type ConsultationStatus = 'In asteptare' | 'In curs' | 'Finalizat';

export type Consultation = {
  id: number;
  pacient: string;
  cnp: string;
  varsta: number;
  ora: string;
  medic: string;
  status: ConsultationStatus;
  simptome: string;
  diagnostic: string;
  recomandari: string;
};

export type MedicalTemplate = {
  id: number;
  name: string;
  description: string;
};

export type ValidationIssue = {
  id: string;
  title: string;
  description: string;
  level: 'success' | 'warning' | 'error';
};
