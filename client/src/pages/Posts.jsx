import React, { useEffect, useContext, useState } from "react";
import PostForm from "../forms/PostForm";
import { ServiceContext } from "../contexts/ServiceProvider";
import { useNavigate } from "react-router-dom";
import { Button, Post, Navigation } from "../common/components";

const Posts = () => {
  const { postRouteService } = useContext(ServiceContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  //pretvoriti koment i button section u formu



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
      <Navigation user={user} />
   
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
