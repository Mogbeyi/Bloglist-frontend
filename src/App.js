import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    let loginUser = {
      username: username.toLowerCase(),
      password: password,
    };

    try {
      const user = await loginService.login(loginUser);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {}
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setLoggedOut(true);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    try {
      const newBlog = await blogService.create(blogObject);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {}
  };

  const loginForm = () => (
    <div style={{ marginBottom: "20px" }}>
      <h4>Please log into the application</h4>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <div>
      <h2>Create new</h2>

      <form style={{ margin: "10px" }} onSubmit={addNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );

  const userExist = () => user === null;

  if (loggedOut) {
    return (
      <div>
        <p>Successfully logged out</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>

        {!userExist() && (
          <p>
            {user.name} is logged in <button onClick={logOut}>logout</button>
          </p>
        )}

        {userExist() && loginForm()}
        {!userExist() && blogForm()}

        {!userExist() &&
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  }
};

export default App;
