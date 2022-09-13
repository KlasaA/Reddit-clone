import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useService } from "../../contexts/ServiceProvider";

const Favorites = ({ post, user, fetchFavoritePosts }) => {
  const { favoriteRouteService } = useService();
  const [favoritePosts, setFavoritePosts] = useState([]);

  const fetchFavoriteList = async () => {
    const res = await favoriteRouteService.getFavoriteList(user._id);
    setFavoritePosts(res.data.favoritePosts);
  };

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  const addToFavorites = async () => {
    await favoriteRouteService.post({
      postId: post._id,
      userId: user._id,
    });
    await fetchFavoriteList();
  };

  const deleteFromFavorites = async ({ userId, postId }) => {
    await favoriteRouteService.deletePostFromFavorites({ userId, postId });
    await fetchFavoriteList();
    await fetchFavoritePosts();
  };

  return (
    <>
      {favoritePosts.includes(post._id) ? (
        <FaHeart
          className="favIcon"
          onClick={() =>
            deleteFromFavorites({ userId: user._id, postId: post._id })
          }
        />
      ) : (
        <FaRegHeart className="favIcon" onClick={() => addToFavorites()} />
      )}
    </>
  );
};

export default Favorites;

// na fetchu svih postova posalje user ID
// usporedim svaki ID u polju Favorites sa Postovima
