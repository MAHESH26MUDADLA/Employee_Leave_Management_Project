import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Leave Management</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Leave List</Link>
          <Link className="nav-link" to="/apply">Apply Leave</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
