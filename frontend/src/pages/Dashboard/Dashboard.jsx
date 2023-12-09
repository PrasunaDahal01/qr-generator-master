import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { pageLoad, deleteUsers } from "../../adapters/Dashboard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const logOut = async (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await pageLoad();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    getUsers();
  }, []);

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
          <Link
            to="/users/addUser"
            style={{ color: "#ed5169", fontWeight: 900 }}
          >
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
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <img
                    src={`http://localhost:3001/public/userImages/${user.image}`}
                    alt={user.image}
                    width="100px"
                    height="100px"
                  />
                </td>
                <td>{user.is_verified}</td>
                <td>
                  <div class="d-flex gap-5">
                    <Link
                      to={`/users/editUser?id=${user._id}`}
                      style={{ color: "#ed5169" }}
                    >
                      Edit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="10"
                        width="10"
                        viewBox="0 0 512 512"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => deleteUsers(user._id)}
                      style={{ color: "#ed5169" }}
                      class="archive-Link"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="10"
                        width="10 "
                        viewBox="0 0 512 512"
                      >
                        <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
