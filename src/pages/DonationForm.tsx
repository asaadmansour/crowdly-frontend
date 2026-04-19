import { useState } from 'react';

export default function DonateButton({ projectId, amount }: { projectId: string | number, amount: string | number }) {
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL || 'http://localhost:8000/api';

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) return;
    
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/donations/checkout/${projectId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      const data = await response.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.error('Failed to get checkout URL', data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={loading || !amount || Number(amount) <= 0}
      className={`btn-primary w-full mt-4 py-3 tracking-wide text-sm font-bold uppercase transition-all ${loading || !amount || Number(amount) <= 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-lg'}`}
    >
      {loading ? 'Redirecting to Stripe...' : `Donate ${amount || 0} EGP`}
    </button>
  );
}