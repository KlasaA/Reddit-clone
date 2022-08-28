import React, { useState, useContext } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import Button from "./Button";
import Input from "./Input";

const CreateReply = ({ user, fetchPosts, data, comment }) => {
  const { commentRouteService } = useContext(ServiceContext);
  const [toggleReply, setToggleReply] = useState(false);
  const [reply, setReply] = useState("");

  const handleCommentChange = async (e) => {
    setReply(e.target.value);
  };

  const handleReplyToggle = async () => {
    setToggleReply(!toggleReply);
  };

  const submitReply = async () => {
    await commentRouteService.post({
      content: reply,
      userId: user._id,
      timeStamp: new Date(),
      commentId: comment._id,
    });
    handleReplyToggle();
    await fetchPosts();
  };

  return (
    <>
      {toggleReply && (
        <>
          <Input onChange={(e) => handleCommentChange(e)} />
        </>
      )}
      <Button
        label={toggleReply ? "submit reply" : "reply"}
        onClick={() => {
          toggleReply ? submitReply() : handleReplyToggle();
        }}
      />
    </>
  );
};

export default CreateReply;
