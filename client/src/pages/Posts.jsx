import React, { useEffect, useContext } from "react";
import PostForm from "../forms/PostForm";
import { ServiceContext } from "../contexts/ServiceProvider";
import { useState } from "react";

const Posts = () => {
  const { postRouteService } = useContext(ServiceContext);

  const [user, setUser] = useState({ email: "", admin: false });
  const [posts, setPosts] = useState([]);

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
      <h3>{user.email}</h3>
      <p>{user.admin ? "Admin" : "User"}</p>
      <PostForm service={postRouteService} fetchPosts={fetchPosts} />

      {posts.map((post) => (
        <div key={post._id}>
          <h1>{post.content.title}</h1>
          <img src={post.content.image} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
