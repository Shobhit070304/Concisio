import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Toast types with their corresponding styles and icons
const TOAST_TYPES = {
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    className: 'bg-green-50 border-green-500 text-green-800'
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    className: 'bg-red-50 border-red-500 text-red-800'
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    className: 'bg-blue-50 border-blue-500 text-blue-800'
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    className: 'bg-amber-50 border-amber-500 text-amber-800'
  }
};

// Custom toast component that matches the landing page styling
const CustomToast = ({ message, type = 'info', onClose }) => {
  const { icon, className } = TOAST_TYPES[type] || TOAST_TYPES.info;
  
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border-l-4 shadow-md ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0">{icon}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast utility functions
const showToast = (message, type = 'info') => {
  return toast(
    ({ closeToast }) => (
      <CustomToast 
        message={message} 
        type={type} 
        onClose={closeToast} 
      />
    ),
    {
      closeButton: false,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'bg-transparent shadow-none p-0 border-none'
    }
  );
};

// Export individual toast functions
export const toastSuccess = (message) => showToast(message, 'success');
export const toastError = (message) => showToast(message, 'error');
export const toastInfo = (message) => showToast(message, 'info');
export const toastWarning = (message) => showToast(message, 'warning');

// Configure toast container
export const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true
};

export default {
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
  warning: toastWarning
};