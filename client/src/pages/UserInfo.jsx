import React, { useState, useEffect, useRef, useContext } from "react";
import { ServiceContext } from "../contexts/ServiceProvider";
import { Input, Button, Navigation } from "../common/components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserInfo = () => {
  const { userRouteService } = useContext(ServiceContext);
  const [user, setUser] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const userInputRef = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(window.sessionStorage.getItem("User"));
    setUser(userData);
    setUpdatedUsername(userData.userName);
  }, []);

  const passwordToggle = (event) => {
    event.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleUserNameChange = (e) => {
    setUpdatedUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUpdatedPassword(e.target.value);
  };

  const handleReadOnly = (e) => {
    e.preventDefault();
    userInputRef.current.focus();
    setReadOnly(!readOnly);
  };
  const submitChanges = async (e) => {
    e.preventDefault();

    setReadOnly(!readOnly);
    const response = await userRouteService.updateUser({
      userId: user._id,
      updatedUserName: updatedUsername,
      updatedPassword: updatedPassword,
    });
    setSuccessMsg(response.data.message);
  };

  return (
    <>
      <Navigation user={user} />
      <div className="userInfo">
        <form>
          <Input
            passDownRef={userInputRef}
            onChange={(e) => handleUserNameChange(e)}
            readOnly={readOnly}
            value={updatedUsername}
            label="Username"
          />

          <div
            className={
              readOnly ? "readOnly displayFlex" : "readOnlyFalse displayFlex"
            }
          >
            <div className="w100">
              <Input
                onChange={(e) => handlePasswordChange(e)}
                readOnly={readOnly}
                type={passwordShown ? "text" : "password"}
                value={updatedPassword}
                placeholder={readOnly ? "" : "Enter New Password"}
                label="Password"
              />
            </div>
            {passwordShown && (
              <FaEyeSlash onClick={passwordToggle} className="eyeIcon" />
            )}
            {!passwordShown && (
              <FaEye onClick={passwordToggle} className="eyeIcon" />
            )}
          </div>
          <p className="success">{successMsg}</p>
          <Button
            label={readOnly ? "Change info" : "Submit changes"}
            className="--button"
            onClick={(e) => (readOnly ? handleReadOnly(e) : submitChanges(e))}
          />
        </form>
      </div>
    </>
  );
};

export default UserInfo;
