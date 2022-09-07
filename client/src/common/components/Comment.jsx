import React, { useContext, useState } from "react";
import { ServiceContext } from "../../contexts/ServiceProvider";
import { Button, Input } from ".";
import CreateReply from "./CreateReply";
import Reply from "./Reply";

const Comment = ({ data, user, fetchPosts, postId }) => {
  const { commentRouteService } = useContext(ServiceContext);
  const [readOnly, setReadOnly] = useState(true);
  const [updatedComment, setUpdatedComment] = useState(data.content);

  const handleCommentChange = async (e) => {
    setUpdatedComment(e.target.value);
  };

  const deleteComment = async ({ replyId, commentId, postId }) => {
    await commentRouteService.delete({ replyId, commentId, postId });
    fetchPosts();
  };

  const handleReadOnly = async () => {
    setReadOnly(!readOnly);
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
    <>
      <p>{data?.user?.userName}</p>
      <p>{data?.timeStamp}</p>

      <Input
        onChange={(e) => handleCommentChange(e)}
        readOnly={readOnly}
        value={updatedComment}
      />

      {data.userId === user._id && (
        <Button
          label={readOnly ? "edit" : "submit"}
          onClick={() => (readOnly ? handleReadOnly() : editComment())}
        />
      )}
      {(data.userId === user._id || user.admin) && (
        <Button
          label="delete Comment"
          onClick={() => deleteComment({ commentId: data._id, postId: postId })}
        />
      )}

      {data.replies.map((reply) => (
        <Reply
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

      <CreateReply
        handleCommentChange={handleCommentChange}
        user={user}
        fetchPosts={fetchPosts}
        /* data={replies} */ comment={data}
      />
    </>
  );
};

export default Comment;

// stisnem edit readOnly se promijeniu True
//
