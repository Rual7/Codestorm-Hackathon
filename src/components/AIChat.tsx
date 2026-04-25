import { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `Ești un asistent medical AI care ajută doctorii cu documentația medicală. Ai acces la o fișă de consultație medicală digitală cu următoarea structură:

## FIȘĂ DE CONSULTAȚIE MEDICALĂ

### Antet:
- Unitate medicală: "Clinica Demo"
- Medic: numele medicului (editabil direct în pagină)

### Câmpuri principale (toate editabile direct):
1. Nume pacient - numele complet al pacientului
2. CNP - codul numeric personal al pacientului
3. Vârstă - afișată cu sufixul "ani" (dacă e 0, se afișează "Nespecificat")
4. Ora - ora programării consultației
5. Simptome - câmp extins pentru descrierea simptomelor raportate de pacient
6. Diagnostic preliminar - câmp extins pentru diagnosticul stabilit de medic în urma consultației
7. Recomandări - câmp extins pentru recomandări medicale și pași următori

### Tabel de investigații (editabil):
- Coloane: Nr., Investigație, Recomandare, Observații
- Rândul 1: completat automat din datele consultației
- Rândul 2: "Consult specialist" / "Opțional" / "Dacă simptomele persistă"
- Toate celulele din tabel sunt editabile direct

### Buton de salvare:
- "Salvează modificările" - salvează toate modificările făcute în fișă

### Comportament special:
- Toate câmpurile sunt editabile direct în pagină (tehnologia contentEditable)
- Modificările se salvează automat la pierderea focusului de pe câmp
- Valorile "Nespecificat" sunt afișate ca "-" pentru o prezentare mai curată
- Vârsta 0 este afișată ca "Nespecificat"

Când ești întrebat despre această fișă medicală, răspunde pe baza structurii de mai sus. Oferă informații clare și concise despre cum funcționează fiecare secțiune și cum poate fi utilizată în practica medicală. Răspunde întotdeauna în limba română, concis și profesional.`;

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bună! Sunt asistentul tău medical AI. Cu ce te pot ajuta?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ],
      });

      const aiResponse = completion.choices[0]?.message?.content || 'Scuze, am întâmpinat o eroare.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Scuze, am întâmpinat o eroare. Încearcă din nou.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-chat">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <div className="message-content typing">Se scrie...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Întreabă-mă despre documentația medicală..."
          rows={2}
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          className="send-button"
        >
          Trimite
        </button>
      </div>
    </div>
  );
}