import React, { useState } from "react";
import { changePassword } from "../../../adapters/Change";

export default function ChangeForm() {
  const [formData, setFormData] = useState({ password: "", newpassword: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(formData);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <a href="/qrs" className="navbar-brand">
            <h2 className="logo">QRcode Generator</h2>
          </a>

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
                  id="adminDashboard"
                  className="nav-link"
                  onclick="getDashboard(event)"
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <a href="/users/profile" className="nav-link">
                  <i className="fa-solid fa-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <button
                  id="logOut"
                  className="nav-link"
                  onclick="logOut(event)"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="box">
        <div className="row custom-row justify-content-center">
          <div className="col-sm-12 col-md-8 col-lg-6">
            <div className="container rounded my-2 px-0 insideContainer">
              <div
                id="messageBox"
                className="message-box py-3 mx-5 px-5 justify-content-center"
              ></div>
              <div className="py-1 header">
                <h1 className="text-center">Change Your Password:</h1>
              </div>
              <form
                action=""
                method="post"
                className="form"
                onSubmit={handleSubmit}
              >
                <div id="userId"></div>

                <div className="py-3 mx-5">
                  <label htmlFor="password" className="form-label">
                    Current Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control p-2"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ password: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="py-3 mx-5">
                  <label htmlFor="password" className="form-label">
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    className="form-control p-2"
                    placeholder="Enter Your Password"
                    value={formData.newpassword}
                    onChange={(e) => {
                      setFormData({ newpassword: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="py-3 mx-5 text-center text-white">
                  <input
                    type="Submit"
                    className="btn text-white"
                    value="Change Password"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5">
          <a href="/users/profile" style={{ color: "azure" }}>
            Go Back
          </a>
        </div>
      </div>
    </>
  );
}
