
import { useState } from 'react';

export default function Mint() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleMint = async () => {
    setStatus('Minting...');
    try {
      const res = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`✅ Minted! CID: ${data.cid}`);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setStatus('❌ Network error');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🧬 Mint a Whisper</h1>
      <textarea
        rows={4}
        style={{ width: '100%', marginBottom: 20 }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your dedication here..."
      />
      <button onClick={handleMint}>Mint</button>
      <p>{status}</p>
    </div>
  );
}
