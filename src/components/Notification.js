import React from 'react';
import './Notification.css';

const Notification = ({ message, onAction, actionText }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      {onAction && actionText && (
        <button onClick={onAction} className="notification-action">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Notification;
