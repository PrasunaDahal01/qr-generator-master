import React from "react";
import { Link } from "react-router-dom";

export default function UserDetails() {
  return (
    <>
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
                <button
                  className="nav-link"
                  id="logOut"
                  onclick="logOut(event)"
                ></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-column">
        <div className="box">
          <div className="row custom-row justify-content-center">
            <div className="col-sm-12">
              <div className="rounded my-2 px-0 insideContainer">
                <div className="py-1 header">
                  <h1 className="text-center">My Profile</h1>
                </div>
                <div id="userId"></div>
                <div className="py-3 mx-5" id="userDetails"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-3 mx-5">
          <Link to="/users/edit" style={{ color: "azure" }}>
            <h5>Edit My Profile</h5>
          </Link>
          <Link to="/auth/changePassword">
            <h5 style={{ color: "azure" }}>Change password</h5>
          </Link>
        </div>
      </div>
    </>
  );
}
