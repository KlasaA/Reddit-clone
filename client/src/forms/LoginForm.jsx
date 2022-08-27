import React, { useState, useContext } from "react";
import { Button, Input, Header } from "../common/components";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    admin: true,
  });

  const [errorMesage, setErrorMesage] = useState("");
  const { userRouteService } = useContext(ServiceContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const passwordToggle = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
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
      <div className="displayFlex">
        <div className="w100">
          <Input
            onChange={(e) => handleChange(e)}
            className="--input fa fa-eye"
            type={passwordShown ? "text" : "password"}
            id="password"
            label="Password"
            placeholder="Enter Password"
          />
        </div>
        {passwordShown && (
          <FaEyeSlash onClick={passwordToggle} className="eyeIcon" />
        )}
        {!passwordShown && (
          <FaEye onClick={passwordToggle} className="eyeIcon" />
        )}
      </div>

      <Button type="submit" className="--button" label="Login" />
      <p className="errMsg">{errorMesage}</p>
    </form>
  );
};

export default LoginForm;

//const
