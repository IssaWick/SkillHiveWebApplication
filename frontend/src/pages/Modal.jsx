import React from "react";
import "../App.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
