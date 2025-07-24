import React from 'react';

const Toast = ({ type, message, open, onClose }) => {
  if (!open) return null;
  return (
    <div className={`toast toast-${type}`}> 
      <span>{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
};

export default Toast; 