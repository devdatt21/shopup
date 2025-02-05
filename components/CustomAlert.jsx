"use client";
import { useState, useEffect } from "react";
import { XCircle, CheckCircle, AlertCircle, Info } from "lucide-react";

const alertStyles = {
  success: "bg-green-100 border-green-500 text-green-700",
  error: "bg-red-100 border-red-500 text-red-700",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
  info: "bg-blue-100 border-blue-500 text-blue-700",
};

const icons = {
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  error: <XCircle className="w-6 h-6 text-red-500" />,
  warning: <AlertCircle className="w-6 h-6 text-yellow-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
};

const CustomAlert = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`fixed top-5 right-5 flex items-center gap-3 p-4 border-l-4 shadow-lg rounded-md ${alertStyles[type]}`}>
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button onClick={() => { setVisible(false); onClose?.(); }} className="ml-auto">
        <XCircle className="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
};

export default CustomAlert;
