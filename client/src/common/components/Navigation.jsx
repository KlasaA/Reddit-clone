import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const Navigation = ({ user }) => {
  const navigate = useNavigate();

  const navigateToFavorites = async () => {
    navigate("/favorites");
    window.scrollTo(0, 0);
  };
  const navigateToPosts = async () => {
    navigate("/posts");
    window.scrollTo(0, 0);
  };
  const navigateToRecommended = async () => {
    navigate("/followed-users");
    window.scrollTo(0, 0);
  };

  const userInfo = () => {
    navigate("/userInfo");
    window.scrollTo(0, 0);
  };

  const logOut = () => {
    window.sessionStorage.removeItem("User");
    navigate("/");
  };

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navigation").style.top = "0";
    } else {
      document.getElementById("navigation").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div id="navigation">
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
        label="Following"
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
      <Button className="navigationLink" label="User Info" onClick={userInfo} />
      <Button className="navigationLink" label="Log out" onClick={logOut} />
    </div>
  );
};

export default Navigation;
