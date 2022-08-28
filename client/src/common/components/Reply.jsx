import React from "react";

const Reply = ({ data, user }) => {
  return (
    <>
      <p>{data.user.userName}</p>
      <p>{data.timeStamp}</p>
      <p>{data.content}</p>
    </>
  );
};

export default Reply;
