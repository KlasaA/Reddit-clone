import React, { useState, useContext } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import Button from "./Button";
import Input from "./Input";

const Comment = ({ data, user, fetchPosts }) => {
  const { commentRouteService } = useContext(ServiceContext);
  const [comment, setComment] = useState("");

  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    await commentRouteService.post({
      content: comment,
      userId: user._id,
      timeStamp: new Date(),
      postId: data._id,
    });
    await fetchPosts();
    setComment("");
  };

  return (
    <>
      <Input
        onChange={(e) => handleCommentChange(e)}
        className="commentInput"
        value={comment}
        placeholder="Comment..."
      />
      <Button
        onClick={() => submitComment(data)}
        className="commentButton"
        label="Comment"
      />
    </>
  );
};

export default Comment;
