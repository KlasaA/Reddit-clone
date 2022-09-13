import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const Navigation = ({ user }) => {
  const navigate = useNavigate();

  const navigateToFavorites = async () => {
    navigate("/favorites");
  };
  const navigateToPosts = async () => {
    navigate("/posts");
  };
  const navigateToRecommended = async () => {
    navigate("/posts");
  };

  const logOut = () => {
    window.sessionStorage.removeItem("User");
    navigate("/");
  };
  return (
    <div className="displayFlex">
      <Button
        onClick={() => {
          navigateToPosts();
        }}
        label="Posts"
        className="navigationLink"
      />
      <Button
        onClick={() => {
          navigateToRecommended();
        }}
        label="Recommended"
        className="navigationLink"
      />
      <Button
        onClick={() => {
          navigateToFavorites();
        }}
        label="Favorites"
        className="navigationLink"
      />

      <h3 className="userEmail">
        {user.email}
        <span className="userStatus">{user.admin ? "Admin" : "User"}</span>
      </h3>
      <Button className="navigationLink" label="Log out" onClick={logOut} />
    </div>
  );
};

export default Navigation;
