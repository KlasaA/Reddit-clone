import React, { useState } from "react";
import { Button, Input } from "../common/components";
import FileBase from "react-file-base64";

const PostForm = ({ service, fetchPosts }) => {
  const intialState = { image: "", title: "" };
  const [content, setContent] = useState(intialState);

  const handleChange = (e) => {
    setContent({ ...content, title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(window.sessionStorage.getItem("User"))._id;

    try {
      await service.post({
        content: content,
        userId,
      });
      fetchPosts();
      setContent({ ...content, image: "", title: "" });
    } catch (error) {
      console.log(error);
    }
  };
  debugger;
  return (
    <form>
      <Input
        onChange={(e) => handleChange(e)}
        className="--title"
        type="text"
        id="title"
        label="title"
        placeholder="Enter Title"
        value={content.title}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setContent({ ...content, image: base64 });
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
