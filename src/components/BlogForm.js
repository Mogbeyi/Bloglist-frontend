import React from "react";

const BlogForm = ({
  addNewBlog,
  title,
  author,
  url,
  handleSetTitle,
  handleSetAuthor,
  handleSetUrl,
}) => {
  return (
    <div>
      <h2>Create new</h2>

      <form style={{ margin: "10px" }} onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleSetTitle}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleSetAuthor}
          />
        </div>

        <div>
          url:
          <input type="text" value={url} name="url" onChange={handleSetUrl} />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
