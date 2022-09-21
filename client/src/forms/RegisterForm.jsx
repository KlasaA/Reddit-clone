import React, { useState, useContext } from "react";
import { Button, Input, Header } from "../common/components";
import { ServiceContext } from "../contexts/ServiceProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = ({ handleToastMessage, toggle, setToggle }) => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    admin: true,
  });
  const [errorMesage, setErrorMesage] = useState("");
  const { userRouteService } = useContext(ServiceContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const passwordToggle = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const confirmPasswordToggle = (event) => {
    event.preventDefault();
    setConfirmPasswordShown(!confirmPasswordShown);
  };

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
        type="email"
        id="email"
        label="E-mail"
        placeholder="Enter E-mail"
      />
      <Input
        onChange={(e) => handleChange(e)}
        className="--input"
        type="text"
        id="userName"
        label="Username"
        placeholder="Enter Username"
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

      <div className="displayFlex">
        <div className="w100">
          <Input
            onChange={(e) => handleChange(e)}
            className="--input fa fa-eye"
            type={confirmPasswordShown ? "text" : "password"}
            id="confirmPassword"
            label="confirmPassword"
            placeholder="Confirm password"
          />
        </div>
        {confirmPasswordShown && (
          <FaEyeSlash onClick={confirmPasswordToggle} className="eyeIcon" />
        )}
        {!confirmPasswordShown && (
          <FaEye onClick={confirmPasswordToggle} className="eyeIcon" />
        )}
      </div>

      <Button type="submit" className="--button" label="Register" />

      <p className="errMsg">{errorMesage}</p>
    </form>
  );
};

export default RegisterForm;
