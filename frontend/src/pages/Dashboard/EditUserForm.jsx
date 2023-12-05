import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pageLoad, editUser } from "../../adapters/Dashboard";

export default function EditUserForm() {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    verifyUser: "",
  });
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
                className="message-box
              py-3 mx-5 px-5 justify-content-center"
              ></div>
              <div className="py-1 header">
                <h1 className="text-center">Edit User Details</h1>
              </div>
              <form
                action=""
                method="post"
                className="form"
                enctype="multipart/form-data"
              >
                <div id="userId"></div>

                <div className="py-3 mx-5">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <div id="emailData"></div>
                </div>

                <div className="py-3 mx-5">
                  <label className="form-label">Verify User:</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="verify"
                      value="true"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">verify</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      name="verify"
                      value="false"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">Unverify</label>
                  </div>
                </div>

                <div className="py-3 mx-5">
                  <label className="form-label"> User Role</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">admin</label>
                  </div>

                  <div className="form-check">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">user</label>
                  </div>
                </div>

                <div className="py-3 mx-5">
                  <input
                    type="file"
                    name="image"
                    className="form-control p-2"
                    placeholder="Upload  Picture:"
                    required
                  />
                </div>

                <div className="py-3 mx-5 text-center text-white">
                  <input
                    type="Submit"
                    className="btn text-white"
                    value="Update User"
                    id="addButton"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5 ">
          <Link to="/users/dashboard" style={{ color: "azure" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
