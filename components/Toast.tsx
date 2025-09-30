'use client';

import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

type ToastHandler = (message: string, type: ToastType) => void;

let toastHandler: ToastHandler | null = null;

export function toast(message: string, type: ToastType = 'info') {
  if (toastHandler) {
    toastHandler(message, type);
  }
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastHandler = (message: string, type: ToastType) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 2000);
    };

    return () => {
      toastHandler = null;
    };
  }, []);

  return (
    <div className="toast toast-top toast-center">
      {toasts.map((toast) => (
        <div key={toast.id} className={`alert alert-${toast.type} shadow-lg`}>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
