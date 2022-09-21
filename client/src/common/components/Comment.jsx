import React, { useContext, useState, useRef } from "react";

import { ServiceContext } from "../../contexts/ServiceProvider";
import { Button, Input } from ".";
import CreateReply from "./CreateReply";
import Reply from "./Reply";
import formatDate from "../../utils/formatDate";

const Comment = ({ data, user, fetchPosts, postId }) => {
  const { commentRouteService } = useContext(ServiceContext);

  const [readOnly, setReadOnly] = useState(true);
  const [updatedComment, setUpdatedComment] = useState(data.content);
  const commentInputRef = useRef(null);

  const handleCommentChange = async (e) => {
    setUpdatedComment(e.target.value);
  };

  const deleteComment = async ({ replyId, commentId, postId }) => {
    await commentRouteService.delete({ replyId, commentId, postId });
    fetchPosts();
  };

  const handleReadOnly = async () => {
    setReadOnly(!readOnly);
    commentInputRef.current.focus();
  };

  const editComment = async () => {
    setReadOnly(!readOnly);
    await commentRouteService.put({
      updatedContent: updatedComment,
      commentId: data._id,
      updatedTimeStamp: new Date(),
    });
    await fetchPosts();
  };

  return (
    <div>
      <div className="commentWrap">
        <p className="commentedBy">{data?.userId?.userName}</p>

        <Input
          passDownRef={commentInputRef}
          onChange={(e) => handleCommentChange(e)}
          readOnly={readOnly}
          value={updatedComment}
          placeholder="test"
          className="comment"
        />
      </div>
      <div className="displayFlex mt10">
        <p class="commentDate">{formatDate(data?.timeStamp)}</p>

        {(data.userId._id === user._id || user.admin) && (
          <Button
            className="secondaryButton"
            label={readOnly ? "Edit" : "Submit"}
            onClick={() => (readOnly ? handleReadOnly() : editComment())}
          />
        )}
        {(data.userId._id === user._id || user.admin) && (
          <Button
            className="secondaryButton"
            label="Delete"
            onClick={() =>
              deleteComment({ commentId: data._id, postId: postId })
            }
          />
        )}
      </div>
      <CreateReply
        handleCommentChange={handleCommentChange}
        user={user}
        fetchPosts={fetchPosts}
        /* data={replies} */ comment={data}
      />

      {data.replies.map((reply) => (
        <Reply
          className="replyContainer"
          data={reply}
          user={user}
          deleteComment={deleteComment}
          postId={postId}
          commentId={data._id}
          editComment={editComment}
          handleCommentChange={handleCommentChange}
          updatedComment={updatedComment}
          fetchPosts={fetchPosts}
        />
      ))}
    </div>
  );
};

export default Comment;

// stisnem edit readOnly se promijeniu True
//
