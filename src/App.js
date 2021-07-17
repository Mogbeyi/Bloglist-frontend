import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Logout from "./components/Logout";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort(sortPostDescending)));
  }, []);

  const sortPostDescending = (a, b) => (a.likes < b.likes ? 1 : -1);

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

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
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
    <Togglable buttonLabel="create blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
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
