import React, { useEffect } from 'react';

export default function Alert({ alertContent, alertType, dispatch }) {
  const closeAlert = () => {
    dispatch({
      type: 'TRIGGER_ALERT',
      payload: { isAlertOpen: false, alertContent: '', alertType: '' },
    });
  };

  useEffect(() => {
    setTimeout(closeAlert, 3300);
    return () => clearTimeout(closeAlert);
  });

  return (
    <div className={`alert ${alertType && alertType}`}>
      {alertContent && <p>{alertContent}</p>}
    </div>
  );
}
