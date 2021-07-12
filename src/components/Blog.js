import React, { useState } from "react";

const Blog = ({ blog, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <li className="blog">
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
          <button onClick={handleDelete}>delete</button>
        </div>
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          {blog.likes}
        </div>
      </div>
    </li>
  );
};
export default Blog;
