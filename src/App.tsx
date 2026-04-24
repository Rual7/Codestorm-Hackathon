import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Consultations from './pages/Consultations';
import DocumentPage from './pages/DocumentPage';
import Templates from './pages/Templates';
import Validator from './pages/Validator';
import type { Page } from './data/types';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<Page>('dashboard');

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <TopBar activeTab={activeTab} />

        {activeTab === 'dashboard' && (
          <Dashboard isRecording={isRecording} setIsRecording={setIsRecording} />
        )}
        {activeTab === 'consultatii' && <Consultations />}
        {activeTab === 'document' && <DocumentPage />}
        {activeTab === 'template-uri' && <Templates />}
        {activeTab === 'validator' && <Validator />}
      </main>
    </div>
  );
}

export default App;
