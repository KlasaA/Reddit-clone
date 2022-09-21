import React, { useState, useRef } from "react";
import { Button, Input } from "../common/components";
import { getBase64 } from "../utils/getBase64";

const PostForm = ({ service, fetchPosts }) => {
  const intialState = { image: "", title: "" };
  const [content, setContent] = useState(intialState);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setContent({ ...content, title: e.target.value });
  };

  const setImage = (image) => {
    setContent({ ...content, image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(window.sessionStorage.getItem("User"))._id;
    try {
      await service.post({
        content: content,
        userId,
        timeStamp: new Date(),
      });
      fetchPosts();
      setContent(intialState);
      fileInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="newPost">
      <Input
        onChange={(e) => handleChange(e)}
        className="--title"
        type="text"
        id="title"
        label="Title"
        placeholder="Enter Title"
        value={content.title}
      />
      <input
        type="file"
        multiple={false}
        ref={fileInputRef}
        onChange={(props) => {
          const image = getBase64(props.target.files[0], setImage);
        }}
      />
      <Button
        onClick={(e) => handleSubmit(e)}
        type="submit"
        className="--button"
        label="Post"
      />
    </form>
  );
};

export default PostForm;
