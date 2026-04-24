type Props = {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
};

export default function RecorderCard({ isRecording, setIsRecording }: Props) {
  return (
    <div className="card recorder-card">
      <h3>Înregistrare consultație</h3>
      <p>Simulăm captarea audio. Într-un produs real, AI-ul ar transcrie conversația și ar completa fișa medicală.</p>

      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={() => setIsRecording(!isRecording)}
      >
        {isRecording ? '⏹ Oprește înregistrarea' : 'Pornește înregistrarea'}
      </button>

      {isRecording && <div className="pulse-ring" />}
    </div>
  );
}
