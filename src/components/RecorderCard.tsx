type Props = {
  isRecording: boolean;
  onToggleRecording: () => void;
};

export default function RecorderCard({ isRecording, onToggleRecording }: Props) {

  return (
    <div className="card recorder-card">
      <h3>Înregistrare consultație</h3>
      <p>Simulăm captarea audio. AI-ul va transcrie conversația și va completa fișa medicală.</p>

      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={onToggleRecording}
      >
        {isRecording ? '⏹ Oprește înregistrarea' : 'Pornește înregistrarea'}
      </button>

      {isRecording && <div className="pulse-ring" />}
    </div>
  );
}
