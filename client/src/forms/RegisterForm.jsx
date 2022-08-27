import React, { useState, useContext } from "react";
import { Button, Input, Header } from "../common/components";
import { ServiceContext } from "../contexts/ServiceProvider";

const RegisterForm = ({ handleToastMessage, toggle, setToggle }) => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
    admin: false,
  });
  const [errorMesage, setErrorMesage] = useState("");
  const { userRouteService } = useContext(ServiceContext);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userRouteService.postSignUp(formValues);
      handleToastMessage();
      setToggle(!toggle);
    } catch (error) {
      setErrorMesage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header label="Register" />
      <Input
        onChange={(e) => handleChange(e)}
        className="--input"
        type="text"
        id="userName"
        label="Username"
        placeholder="Enter Username"
      />
      <Input
        onChange={(e) => handleChange(e)}
        className="--input"
        type="email"
        id="email"
        label="E-mail"
        placeholder="Enter E-mail"
      />
      <Input
        onChange={(e) => handleChange(e)}
        className="--input"
        type="password"
        id="password"
        label="Password"
        placeholder="Enter Password"
      />
      <Button type="submit" className="--button" label="Register" />

      <p className="errMsg">{errorMesage}</p>
    </form>
  );
};

export default RegisterForm;
