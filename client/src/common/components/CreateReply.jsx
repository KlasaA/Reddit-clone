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
    <div className="createReplyWrap">
      {toggleReply && (
        <>
          <Input className="replyInput" onChange={(e) => handleCommentChange(e)} />
        </>
      )}
      <Button
        className="secondaryButton mlpl0"
        label={toggleReply ? "Submit Reply" : "Reply"}
        onClick={() => {
          toggleReply ? submitReply() : handleReplyToggle();
        }}
      />
    </div>
  );
};

export default CreateReply;
