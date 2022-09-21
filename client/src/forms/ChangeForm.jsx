import { useState } from "react";
import { Button } from "../common/components";
import { RegisterForm, LoginForm } from "../forms";
import ToastMessage from "../common/components/ToastMessage";

import React from "react";

const ChangeForm = () => {
  const [toggle, setToggle] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const destroy = () => {
    setToastMessage("");
  };

  const handleToastMessage = () => {
    setToastMessage("Success: Sign up Successfull !");
  };

  return (
    <>
      {toggle ? (
        <RegisterForm
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
          handleToastMessage={handleToastMessage}
          toggle={toggle}
          setToggle={setToggle}
        />
      ) : (
        <LoginForm />
      )}

      <Button
        className="switchButton"
        label={toggle ? "Switch To Login" : "Switch to Register"}
        onClick={() => {
          setToggle(!toggle);
        }}
      />

      {toastMessage && (
        <ToastMessage
          className="toastMessage"
          message={toastMessage}
          closeFn={destroy}
        />
      )}
    </>
  );
};

export default ChangeForm;
