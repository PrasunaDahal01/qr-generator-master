import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addUser } from "../../adapters/Add";

export default function AddUserForm() {
  const [formData, setFormData] = useState({ email: "", image: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
  };
  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };
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
                <button className="nav-link" id="logOut" onClick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <div className="row ">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">Add New User</h1>
                </div>
                <form
                  action=""
                  method="post"
                  className="form"
                  enctype="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <div className="py-3 mx-5">
                    <label htmlFor="email" className="form-label p-2 my-3">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="form-control p-2"
                      placeholder="example@gmail.com"
                      required
                      onChange={(e) => {
                        setFormData({ email: e.target.value });
                      }}
                    />
                  </div>

                  <div className="py-3 mx-5">
                    <label htmlFor="file" className="form-label">
                      Upload Picture:
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control p-2 my-3"
                      placeholder="Enter Your Picture:"
                      required
                      onChange={(e) => {
                        setFormData({ image: e.target.value });
                      }}
                    />
                  </div>

                  <div className="py-3 mx-5 text-center ">
                    <input
                      type="Submit"
                      className="btn button"
                      value="Add User"
                      id="addButton"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5">
          <Link to="/users/dashboard" style={{ color: "#ed5169" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
