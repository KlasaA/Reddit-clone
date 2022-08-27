import React from "react";
import { CreateComment, Button, Comment } from ".";

const Post = ({ data, user, service, fetchPosts }) => {
  const deletePost = async (id) => {
    const response = await service.delete(id);
    fetchPosts();
  };
  return (
    <>
      {data && (
        <div>
          <div className="displayFlex">
            <p className="postedBy">
              <span className="postedByLeftSide">Posted by: </span>
              <span className="postedByRightSide">{data?.user?.userName}</span>
            </p>
            {(data.userId === user._id || user.admin) && (
              <Button
                className="deletePost"
                onClick={() => {
                  deletePost(data._id);
                }}
                label="Delete Post"
              />
            )}
          </div>
          <h1 className="postHeader">{data.content.title}</h1>
          <img className="postImage" alt="" src={data.content.image} />
          {data.comments.map((comment) => (
            <Comment data={comment} user={user} fetchPosts={fetchPosts} postId={data._id} />
          ))}
          <CreateComment data={data} user={user} fetchPosts={fetchPosts} />
        </div>
      )}
    </>
  );
};

export default Post;

// post se sastoji od ime tko je objavio , delete button,  title slika komentari kreacije komenta
