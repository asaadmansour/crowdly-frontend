import React from 'react';
import { useSelector } from 'react-redux';

export default function GlobalSpinner() {
  const isLoading = useSelector((state) => state.auth.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="w-12 h-12 border-4 border-white/30 border-t-[#ff5600] rounded-full animate-spin"></div>
    </div>
  );
}
