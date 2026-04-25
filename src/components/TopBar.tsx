import type { Page } from '../data/types';

type Props = {
  activeTab: Page;
};

const titles: Record<Page, string> = {
  dashboard: 'Dashboard',
  consultatii: 'Consultații',
  validator: 'Validator document',
};

export default function TopBar({ activeTab }: Props) {
  return (
    <header className="top-bar">
      <div>
        <h2>{titles[activeTab]}</h2>
        <p>Asistent pentru completarea și validarea documentelor medicale.</p>
      </div>
      <div className="user-profile">Dr. Andrei Ionescu</div>
    </header>
  );
}
