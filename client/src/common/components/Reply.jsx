import React, { useContext, useState, useRef } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import Button from "./Button";
import Input from "./Input";
import formatDate from "../../utils/formatDate";

const Reply = ({
  data,
  user,
  deleteComment,
  postId,
  commentId,
  fetchPosts,
  className,
}) => {
  const { commentRouteService } = useContext(ServiceContext);

  const [readOnly, setReadOnly] = useState(true);
  const [updatedReply, setUpdatedReply] = useState(data.content);
  const commentInputRef = useRef(null);

  const handleReplyChange = async (e) => {
    setUpdatedReply(e.target.value);
  };

  const handleReadOnly = async () => {
    setReadOnly(!readOnly);
    commentInputRef.current.focus();
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
    <div className={className}>
      <div className="replyWrap">
        <p className="repliedBy">{data.userId.userName}</p>

        <Input
          passDownRef={commentInputRef}
          onChange={(e) => handleReplyChange(e)}
          readOnly={readOnly}
          value={updatedReply}
          className="reply"
        />
      </div>

      <div className="displayFlex mt10">
        <p className="commentDate">{formatDate(data.timeStamp)}</p>

        {data.userId._id === user._id ||
          (user.admin && (
            <Button
              className="secondaryButton"
              label="delete"
              onClick={() =>
                deleteComment({
                  replyId: data._id,
                  postId: postId,
                  commentId: commentId,
                })
              }
            />
          ))}

        {(data.userId._id === user._id || user.admin) && (
          <Button
            className="secondaryButton"
            label={readOnly ? "edit" : "submit"}
            onClick={() => (readOnly ? handleReadOnly() : editReply())}
          />
        )}
      </div>
    </div>
  );
};

export default Reply;
