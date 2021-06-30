import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Logout from "./components/Logout";
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

  const handleLogOut = () => {
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
    <LoginForm
      username={username}
      password={password}
      handleLogin={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );

  const blogForm = () => (
    <BlogForm
      title={title}
      author={author}
      url={url}
      addNewBlog={addNewBlog}
      handleSetAuthor={({ target }) => setAuthor(target.value)}
      handleSetUrl={({ target }) => setAuthor(target.value)}
      handleSetTitle={({ target }) => setAuthor(target.value)}
    />
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

        {!userExist() && <Logout user={user} handleLogOut={handleLogOut} />}

        {userExist() && loginForm()}
        {!userExist() && blogForm()}

        {!userExist() &&
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  }
};

export default App;
