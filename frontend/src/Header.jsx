import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { AllFuntion } from "./store";
function Header() {
  const { auth, handleLogout } = useContext(AllFuntion);
  return (
    <div className="main">
      <Link to="/">
        <h2 className="ms-4">Todo App</h2>
      </Link>
      {/* addpost */}
      <Link to={auth ? "/addtask" : "/login"}>
        <h2 className="addtask">Add Task</h2>
      </Link>
      <div>
        {auth ? (
          <button className="button me-5" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="button me-5">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
