import React from 'react';

export default function Modal({
  message,
  action,
  buttonContent,
  closeText,
  dispatch,
  modal,
}) {
  const closeModal = () => {
    dispatch({ type: 'TRIGGER_MODAL', payload: { ...modal } });
  };

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal">
        <p className="modal-message">{message || 'undefined'}</p>
        {buttonContent && (
          <>
            <button
              className="btn danger modal-btn"
              type="button"
              onClick={action}
            >
              {buttonContent}
            </button>
            <button
              className="btn modal-btn"
              type="button"
              onClick={closeModal}
            >
              {closeText || 'Close'}
            </button>
          </>
        )}
      </div>
    </>
  );
}
