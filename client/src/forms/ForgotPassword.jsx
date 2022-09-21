import React, { useState, useContext } from "react";
import { Input, Button } from "../common/components";
import { ServiceContext } from "../contexts/ServiceProvider";

const ForgotPassword = ({ toggle, setToggle }) => {
  const { userRouteService } = useContext(ServiceContext);
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const sendNewPassword = async (e) => {
    e.preventDefault();

    const res = await userRouteService.newPassword({
      email: email,
    });
    alert(res.data);
  };

  return (
    <>
      <form>
        <Input
          onChange={(e) => handleChange(e)}
          className="--input"
          type="email"
          id="email"
          label="E-mail"
          placeholder="Enter E-mail"
        />
        <Button
          onClick={() => {
            setToggle(!toggle);
          }}
          className="--button"
          label={toggle ? "forgot password" : "back to login"}
        />
        <Button
          onClick={(e) => sendNewPassword(e)}
          type="submit"
          className="--button"
          label="Create new password"
        />
      </form>
    </>
  );
};

export default ForgotPassword;
