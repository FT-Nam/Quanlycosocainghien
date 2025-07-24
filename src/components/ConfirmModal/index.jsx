import React from 'react';

const ConfirmModal = ({ open, onClose, onConfirm, title, content }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">
          <button onClick={onClose}>Huỷ</button>
          <button onClick={onConfirm} className="danger">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 