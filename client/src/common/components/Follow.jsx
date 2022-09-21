import React, { useState, useEffect } from "react";
import { useService } from "../../contexts/ServiceProvider";
import Button from "./Button";

const Follow = ({ post, user, fetchFollowedUsersPosts, fetchPosts }) => {
  const { followedRouteService } = useService();
  const [followedUsersPosts, setFollowedUsersPosts] = useState([]);

  const fetchFollowedUsersList = async () => {
    const res = await followedRouteService.getFollowingList(user._id);
    setFollowedUsersPosts(res.data.followedUsers);
  };

  useEffect(() => {
    fetchFollowedUsersList();
  }, [followedUsersPosts]);

  const addToFollowedUsers = async () => {
    await followedRouteService.post({
      userId: user._id,
      followedUserId: post.userId._id,
    });

    await fetchFollowedUsersPosts();
  };

  const deleteFollowedUser = async () => {
    await followedRouteService.deleteFollowedUser({
      userId: user._id,
      followedUserId: post.userId._id,
    });

    await fetchFollowedUsersPosts();
  };

  return (
    <>
      {" "}
      {followedUsersPosts.includes(post.userId._id) ? (
        <Button
          className="unfollow"
          label="unfollow"
          onClick={() => deleteFollowedUser()}
        />
      ) : (
        <Button
          className="follow"
          label="follow"
          onClick={() => addToFollowedUsers()}
        />
      )}
    </>
  );
};

export default Follow;

// na fetchu svih postova posalje user ID
// usporedim svaki ID u polju Favorites sa Postovima
