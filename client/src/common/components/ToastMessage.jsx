import React, { useEffect } from "react";

const ToastMessage = ({ message, closeFn, className }) => {
  useEffect(() => {
    setTimeout(() => closeFn(), 5000);
  }, [closeFn]);

  return (
    <div className="toastWrap">
      <p className="checkIcon">&#x2714;</p>
      <p className={className}>{message}</p>
    </div>
  );
};

export default ToastMessage;
