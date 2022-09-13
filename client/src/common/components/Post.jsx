import React from "react";
import { CreateComment, Button, Comment } from ".";
import { FaRegTrashAlt } from "react-icons/fa";
import Favorite from "./Favorite";

const Post = ({ data, user, service, fetchPosts, fetchFavoritePosts }) => {
  const deletePost = async (id) => {
    const response = await service.delete(id);
    fetchPosts();
  };
  return (
    <>
      {data && (
        <div className="Post">
          <div className="displayFlex">
            <p className="postedBy">
              <span className="postedByLeftSide">Posted by: </span>
              <span className="postedByRightSide">{data?.user?.userName}</span>
            </p>
            <Favorite
              post={data}
              user={user}
              fetchFavoritePosts={fetchFavoritePosts}
            />
            {(data.userId === user._id || user.admin) && (
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
      )}
    </>
  );
};

export default Post;

// post se sastoji od ime tko je objavio , delete button,  title slika komentari kreacije komenta
