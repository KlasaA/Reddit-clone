import React, { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import { Button, Input } from ".";
import CommentReplay from "./CommentReplay";

const Comment = ({ data, user, fetchPosts, postId }) => {
  const { commentRouteService } = useContext(ServiceContext);
  const [readOnly, setReadOnly] = useState(true);
  const [updatedComment, setUpdatedComment] = useState(data.content);

  const handleCommentChange = async (e) => {
    setUpdatedComment(e.target.value);
  };

  const deleteComment = async (id) => {
    await commentRouteService.delete({ id, postId });
    fetchPosts();
  };
  const editComment = async () => {
    setReadOnly(!readOnly);
    if (!readOnly) {
      await commentRouteService.put({
        updatedContent: updatedComment,
        commentId: data._id,
        updatedTimeStamp: new Date(),
      });
      await fetchPosts();
    }
  };

  return (
    <>
      <p>{data.user.userName}</p>
      <p>{data.timeStamp}</p>
      <Input
        onChange={(e) => handleCommentChange(e)}
        readOnly={readOnly}
        value={updatedComment}
      />

      {(data.userId === user._id || user.admin) && (
        <Button
          label={readOnly ? "edit" : "submit"}
          onClick={() => editComment()}
        />
      )}
      {(data.userId === user._id || user.admin) && (
        <Button
          label="delete Comment"
          onClick={() => deleteComment(data._id)}
        />
      )}
      <CommentReplay handleCommentChange={handleCommentChange} />
    </>
  );
};

export default Comment;

// stisnem edit readOnly se promijeniu True
//
