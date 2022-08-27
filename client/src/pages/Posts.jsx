import React, { useEffect, useContext, useState } from "react";
import PostForm from "../forms/PostForm";
import { ServiceContext } from "../contexts/ServiceProvider";
import { useNavigate } from "react-router-dom";
import { Button, Post } from "../common/components";

const Posts = () => {
  const { postRouteService } = useContext(ServiceContext);
  const [user, setUser] = useState({ email: "", admin: false });
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  //pretvoriti koment i button section u formu

  const logOut = () => {
    window.sessionStorage.removeItem("User");
    navigate("/");
  };

  useEffect(() => {
    fetchPosts();
    const userData = JSON.parse(window.sessionStorage.getItem("User"));
    setUser(userData);
  }, []);

  const fetchPosts = async () => {
    const response = await postRouteService.get();
    setPosts(response.data);
  };

  return (
    <div>
      <h3 className="userEmail">
        {user.email}
        <span className="userStatus">{user.admin ? "Admin" : "User"}</span>
      </h3>
      <Button className="logOutButton" label="Log out" onClick={logOut} />
      <PostForm service={postRouteService} fetchPosts={fetchPosts} />

      {posts.length > 0 && (
        <>
          {posts.map((post) => (
            <Post
              data={post}
              user={user}
              service={postRouteService}
              fetchPosts={fetchPosts}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
