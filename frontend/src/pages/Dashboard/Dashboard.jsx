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
      <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container-fluid">
          <Link to="/qrs" class="navbar-brand">
            <h2 class="logo">QRcode Generator</h2>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <button class="nav-link" id="logOut" onclick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="d-flex flex-column">
        <div class="addUser">
          <Link to="/users/add">Add New User</Link>
        </div>
        <h4 style={{ color: "coral" }}>Users List:</h4>
        <table class="table w-50" style={{ color: "coral" }}>
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
