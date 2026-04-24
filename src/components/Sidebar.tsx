import type { Page } from '../data/types';

type Props = {
  activeTab: Page;
  setActiveTab: (page: Page) => void;
};

const menu: { id: Page; label: string }[] = [
  { id: 'dashboard', label: '🏠 Dashboard' },
  { id: 'consultatii', label: '📅 Consultații' },
  { id: 'document', label: '📝 Fișă medicală' },
  { id: 'template-uri', label: '📄 Template-uri' },
  { id: 'validator', label: '✅ Validator' },
];

export default function Sidebar({ activeTab, setActiveTab }: Props) {
  return (
    <aside className="sidebar">
      <div className="logo">AI-Doc Assist</div>
      <p className="sidebar-subtitle">Medical documentation copilot</p>

      <nav>
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={activeTab === item.id ? 'active' : ''}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
