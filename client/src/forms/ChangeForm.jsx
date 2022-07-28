import { useState } from "react";
import { Button } from "../common/components";
import { RegisterForm, LoginForm } from "../forms";

import React from "react";

const ChangeForm = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      {toggle && <RegisterForm />}
      {!toggle && <LoginForm />}
      <Button
        label={toggle ? "Switch To Login" : "Switch to Register"}
        onClick={() => {
          setToggle(!toggle);
        }}
      />
    </>
  );
};

export default ChangeForm;
