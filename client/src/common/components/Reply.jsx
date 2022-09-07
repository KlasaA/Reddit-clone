import React, { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import Button from "./Button";
import Input from "./Input";

const Reply = ({
  data,
  user,
  deleteComment,
  postId,
  commentId,
  fetchPosts,
}) => {
  const { commentRouteService } = useContext(ServiceContext);

  const [readOnly, setReadOnly] = useState(true);
  const [updatedReply, setUpdatedReply] = useState(data.content);

  const handleReplyChange = async (e) => {
    setUpdatedReply(e.target.value);
  };

  const handleReadOnly = async () => {
    setReadOnly(!readOnly);
  };

  const editReply = async () => {
    setReadOnly(!readOnly);
    await commentRouteService.put({
      updatedContent: updatedReply,
      commentId: data._id,
      updatedTimeStamp: new Date(),
    });
    await fetchPosts();
  };

  return (
    <>
      <p>{data.user.userName}</p>
      <p>{data.timeStamp}</p>

      <Input
        onChange={(e) => handleReplyChange(e)}
        readOnly={readOnly}
        value={updatedReply}
      />

      {(data.userId === user._id || user.admin) && (
        <Button
          label="delete Comment"
          onClick={() =>
            deleteComment({
              replyId: data._id,
              postId: postId,
              commentId: commentId,
            })
          }
        />
      )}

      {(data.userId === user._id || user.admin) && (
        <Button
          label={readOnly ? "edit" : "submit"}
          onClick={() => (readOnly ? handleReadOnly() : editReply())}
        />
      )}
    </>
  );
};

export default Reply;
