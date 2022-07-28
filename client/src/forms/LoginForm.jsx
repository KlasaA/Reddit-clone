import React, { useState, useContext } from "react";
import { Button, Input, Header } from "../common/components";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceProvider";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    admin: true,
  });

  const [errorMesage, setErrorMesage] = useState("");
  const { userRouteService } = useContext(ServiceContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await userRouteService.postSignIn(formValues);
    

      window.sessionStorage.setItem("User", JSON.stringify(response.data));
      navigate("/posts");
      
    } catch (error) {
      console.log(error);
      setErrorMesage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header label="Login" />

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
      <Button type="submit" className="--button" label="Login" />
      <p>{errorMesage}</p>
    </form>
  );
};

export default LoginForm;

// morma proucit kako koristi kontekst
// session storage
// local storage na chromu
