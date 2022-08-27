import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const CommentReplay = () => {
  const [replay, setReplay] = useState(false);
  const [comment, setComment] = useState("");
  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };



  return (
    <>
      {replay && <Input onChange={(e) => handleCommentChange(e)} />}
      <Button label="replay" onClick={() => setReplay(!replay)} />
    </>
  );
};

export default CommentReplay;
