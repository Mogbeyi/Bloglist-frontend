import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [like, setLikes] = useState(blog.likes);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleDelete = async (id) => {
    const deletedBlog = await blogService.remove(id);
  };

  const handleLike = async () => {
    //todo: work on fixing the issue with likes lagging by one update
    setLikes(like + 1);
    const updatedContent = {
      user: blog.user.id,
      likes: like,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    await blogService.update(updatedContent, blog.id);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog">
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
          <button onClick={handleDelete}>delete</button>
        </div>
        <div style={showWhenVisible} className="likesUrl">
          {blog.url}
          <br />
          {like}
          <button onClick={handleLike}>like</button>
        </div>
      </div>
    </div>
  );
};
export default Blog;
