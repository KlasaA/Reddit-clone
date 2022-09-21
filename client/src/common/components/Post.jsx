import React from "react";
import { CreateComment, Button, Comment } from ".";
import { FaRegTrashAlt } from "react-icons/fa";
import Favorite from "./Favorite";
import Follow from "./Follow";
import formatDate from "../../utils/formatDate";

const Post = ({
  data,
  user,
  service,
  fetchPosts,
  fetchFavoritePosts,
  fetchFollowedUsersPosts,
}) => {
  
  const deletePost = async (id) => {
    const response = await service.delete(id);
    fetchPosts();
  };

  return (
    <>
      {data && (
        <div className="Post">
          <div className="postPadding">
            <p>{formatDate(data.timeStamp)}</p>
            <div className="displayFlex">
              <p className="postedBy">
                <span className="postedByLeftSide">Posted by: </span>
                <span className="postedByRightSide">
                  {data.userId.userName}
                </span>
              </p>

              {user._id !== data.userId._id && (
                <Follow
                  user={user}
                  post={data}
                  fetchFollowedUsersPosts={fetchFollowedUsersPosts}
                  fetchPosts={fetchPosts}
                />
              )}

              <Favorite
                post={data}
                user={user}
                fetchFavoritePosts={fetchFavoritePosts}
              />

              {(data.userId._id === user._id || user.admin) && (
                <FaRegTrashAlt
                  className="deletePost"
                  onClick={() => {
                    deletePost(data._id);
                  }}
                />
              )}
            </div>
            <h1 className="postHeader">{data.content.title}</h1>
            <img className="postImage" alt="" src={data.content.image} />
            <CreateComment data={data} user={user} fetchPosts={fetchPosts} />
            {data.comments.map((comment) => (
              <Comment
                data={comment}
                user={user}
                fetchPosts={fetchPosts}
                postId={data._id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

// post se sastoji od ime tko je objavio , delete button,  title slika komentari kreacije komenta
