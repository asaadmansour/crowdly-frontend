import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../utils/api.js';

export default function VerifyEmailToken() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      try {
        await api.get(`/auth/verify-token/verify/?token=${token}`);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fafafa] font-[var(--font-display)] antialiased p-6">
      <div className="w-full max-w-[480px] bg-white p-8 md:p-12 shadow-sm border border-[#eee] rounded-[4px] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5021] to-[#ff9b44]"></div>

        {status === 'loading' && (
          <div>
            <div className="w-16 h-16 border-4 border-[#eee] border-t-[#ff5021] rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-[28px] font-bold text-[#111] tracking-tight mb-3">Verifying...</h2>
            <p className="text-[15px] text-[#666]">Please wait while we securely confirm your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#4caf50]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[28px] font-bold text-[#111] tracking-tight mb-3">Email Verified!</h2>
            <p className="text-[15px] text-[#666] mb-8 leading-relaxed">
              Your account has been successfully confirmed. You are ready to log in immediately!
            </p>
            <Link to="/login" className="block w-full bg-[#151515] hover:bg-black transition-colors text-white py-3.5 px-6 rounded-[3px] text-[13px] font-bold tracking-[0.2em] uppercase cursor-pointer no-underline">
              Go to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-16 h-16 bg-[#fff2ef] rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-[#ff5021]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-[28px] font-bold text-[#111] tracking-tight mb-3">Link Expired</h2>
            <p className="text-[15px] text-[#666] mb-8 leading-relaxed">
              This verification link is invalid or has expired. Please log in to request a new verification link.
            </p>
            
            <Link to="/login" className="block w-full bg-[#151515] hover:bg-black transition-colors text-white py-3.5 px-6 rounded-[3px] text-[13px] font-bold tracking-[0.2em] uppercase cursor-pointer no-underline">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}