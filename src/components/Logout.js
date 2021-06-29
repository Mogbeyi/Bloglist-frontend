import React from "react";

const Logout = ({ user, handleLogOut }) => {
  return (
    <div>
      Logged in as {user.name} <button onClick={handleLogOut}>logout</button>
    </div>
  );
};

export default Logout;
