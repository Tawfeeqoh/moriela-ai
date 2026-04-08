'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function askMoriela() {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.text);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-serif mb-8 tracking-widest text-gold-500">MORIELA AI</h1>
      
      <div className="w-full max-w-2xl bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-2xl">
        <textarea 
          className="w-full bg-black border border-zinc-700 p-4 rounded text-white focus:outline-none focus:border-white transition-all"
          placeholder="Describe the dress, upload measurements, or ask for a pattern..."
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
          onClick={askMoriela}
          disabled={loading}
          className="mt-4 w-full bg-white text-black py-3 font-bold hover:bg-zinc-200 transition-colors rounded"
        >
          {loading ? 'MORIELA IS THINKING...' : 'CONSULT COUTURIER'}
        </button>

        {response && (
          <div className="mt-8 p-4 border-t border-zinc-800 leading-relaxed text-zinc-300 whitespace-pre-wrap font-light">
            {response}
          </div>
        )}
      </div>
    </main>
  );
}
