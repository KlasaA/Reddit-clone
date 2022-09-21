import React, { useState, useEffect } from "react";
import { useService } from "../contexts/ServiceProvider";
import { Navigation, Post } from "../common/components/";
import { FaSadTear } from "react-icons/fa";

const Followed = () => {
  const { followedRouteService } = useService();
  const [followedPosts, setFollowedPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchFollowedUsersPosts();
  }, []);

  const fetchFollowedUsersPosts = async () => {
    const userData = await JSON.parse(window.sessionStorage.getItem("User"));
    setUser(userData);
    const response = await followedRouteService.getFollowedPosts(userData._id);
    setFollowedPosts(response.data);
  };

  return (
    <>
      <Navigation user={user} />
      {followedPosts.length > 0 ? (
        <>
          {followedPosts.map((post) => (
            <Post
              data={post}
              user={user}
              fetchFollowedUsersPosts={fetchFollowedUsersPosts}
            />
          ))}
        </>
      ) : (
        <div class="noFavPostsWrap">
          <p class="noFavPostsText">There are no favorite posts</p>
          <FaSadTear className="sadFav"/>
        </div>
      )}
    </>
  );
};

export default Followed;
