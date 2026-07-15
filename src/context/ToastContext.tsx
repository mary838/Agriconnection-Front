"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastCtx = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastCtx>({
  showToast: () => {},
});

const TOAST_STYLES: Record<ToastType, string> = {
  success: "bg-[#1e4d14] text-white",
  error: "bg-red-600 text-white",
  info: "bg-[#333] text-white",
};

const TOAST_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-toast-in pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-[14px] font-medium ${TOAST_STYLES[toast.type]}`}
          >
            <span>{TOAST_ICONS[toast.type]}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
