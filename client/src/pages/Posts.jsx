import React, { useEffect, useState } from "react";
import PostForm from "../forms/PostForm";
import { useService } from "../contexts/ServiceProvider";
import { useNavigate } from "react-router-dom";
import { Button, Post, Navigation } from "../common/components";

const Posts = () => {
  const { postRouteService } = useService();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const navigate = useNavigate();
  //pretvoriti koment i button section u formu

  useEffect(() => {
    fetchPosts();
    const userData = JSON.parse(window.sessionStorage.getItem("User"));
    setUser(userData);
  }, [pageNumber]);

  const fetchPosts = async () => {
    const response = await postRouteService.get({
      pageSize: 3,
      page: pageNumber,
    });

    setPosts(response.data.posts);
    setNumOfPages(response.data.numOfPages);
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
      {/**
       * TIP: Kada koristiš array metodu, ako ti treba samo index, prvi parametar staviš kao anoniman
       */}
      <div className="pagginationWrap">
        {[...Array(numOfPages)].map((_, idx) => (
          <Button
            className={
              pageNumber === idx + 1
                ? "activeButton pagginationButton"
                : "pagginationButton"
            }
            onClick={() => setPageNumber(idx + 1)}
            label={idx + 1}
            id={idx + 1}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
