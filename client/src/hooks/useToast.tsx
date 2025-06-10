import React, { useState } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface ToastHook {
  showToast: (message: string, type: 'success' | 'error') => void;
  ToastContainer: React.FC;
}

export const useToast = (): ToastHook => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const ToastContainer: React.FC = () => {
    return (
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow-lg ${
              toast.type === 'success'
                ? 'bg-lime-400 text-gray-900'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    );
  };

  return {
    showToast,
    ToastContainer
  };
}; 