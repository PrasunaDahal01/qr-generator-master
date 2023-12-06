import React from "react";
import { Link } from "react-router-dom";

import { pageLoad, deleteUSers } from "../../adapters/Dashboard";
export default function Dashboard() {
  const logOut = async (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <Link to="/qrs" className="navbar-brand">
            <h2 className="logo">QRcode Generator</h2>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link" id="logOut" onclick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-column columnBox">
        <div className="addUser">
          <Link to="/users/add" style={{ color: "#ed5169", fontWeight: 900 }}>
            Add New User
          </Link>
        </div>
        <h4 style={{ color: "#ed5169 " }}>Users List:</h4>
        <table className="table w-50" style={{ color: "coral" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Image</th>
              <th>Verifed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="user-table-body"></tbody>
        </table>
      </div>
    </div>
  );
}
