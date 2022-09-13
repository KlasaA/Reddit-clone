import React, { useState, useEffect } from "react";
import { useService } from "../contexts/ServiceProvider";
import { Post, Navigation } from "../common/components";
import { FaSadTear } from "react-icons/fa";

const Favorites = () => {
  const { favoriteRouteService } = useService();
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchFavoritePosts();
  }, []);

  const fetchFavoritePosts = async () => {
    const userData = await JSON.parse(window.sessionStorage.getItem("User"));
    setUser(userData);
    const response = await favoriteRouteService.getFavoritePosts(userData._id);
    setFavoritePosts(response.data);
  };

  return (
    <>
      <Navigation user={user} />
      {favoritePosts.length > 0 ? (
        <>
          {favoritePosts.map((post) => (
            <Post
              data={post}
              user={user}
              fetchFavoritePosts={fetchFavoritePosts}
            />
          ))}
        </>
      ) : (
        <div class="noFavPostsWrap">
          <p class="noFavPostsText">There are no favorite posts</p>
          <FaSadTear />
        </div>
      )}
    </>
  );
};

export default Favorites;

//
