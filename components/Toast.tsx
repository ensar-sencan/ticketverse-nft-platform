'use client';

import { useEffect } from 'react';
import { FiCheckCircle, FiX, FiInfo, FiAlertCircle } from 'react-icons/fi';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
    info: <FiInfo size={24} />
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-blue-500 to-cyan-500'
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slideUp">
      <div className="backdrop-blur-xl bg-black/80 border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-w-md">
        <div className={`h-1 bg-gradient-to-r ${colors[type]}`}></div>
        <div className="p-4 flex items-center gap-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${colors[type]} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
            {icons[type]}
          </div>
          <p className="text-white font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}