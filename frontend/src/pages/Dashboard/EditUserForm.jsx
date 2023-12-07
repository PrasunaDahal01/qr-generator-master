import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pageLoad, editUser } from "../../adapters/Edit";

export default function EditUserForm() {
  const [formData, setFormData] = useState({
    email: "",
    verify: "",
    role: "",
    img: "",
  });
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(userId, formData);
  };
  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    setUserId(userId);
    pageLoad(userId, setFormData, setUserId);
  }, []); //put the props userdata or something here

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
                <button className="nav-link" id="logOut" onclick={logOut}>
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
                  <h1 className="text-center">Edit User Details</h1>
                </div>
                <form
                  action=""
                  method="post"
                  className="form"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <div className="py-3 mx-5">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ email: e.target.value });
                      }}
                      className="form-control"
                      placeholder="Enter Email"
                      required
                    />
                  </div>

                  <div className="py-3 mx-5">
                    <label className="form-label">Verify User:</label>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="verify"
                        value="true"
                        onChange={(e) => {
                          setFormData({ ...formData, verify: e.target.value });
                        }}
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
                        onChange={(e) => {
                          setFormData({ ...formData, verify: e.target.value });
                        }}
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
                        onChange={(e) => {
                          setFormData({ ...formData, role: e.target.value });
                        }}
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
                        onChange={(e) => {
                          setFormData({ ...formData, role: e.target.value });
                        }}
                        required
                      />
                      <label className="form-check-label">user</label>
                    </div>
                  </div>

                  <div className="py-3 mx-5">
                    <input
                      type="file"
                      name="image"
                      value={formData.img}
                      className="form-control p-2"
                      placeholder="Upload  Picture:"
                      onChange={(e) => {
                        setFormData({ ...formData, img: e.target.files[0] });
                      }}
                      required
                    />
                  </div>

                  <div className="py-3 mx-5 text-center text-white">
                    <input
                      type="Submit"
                      className="btn button "
                      value="Update User"
                      id="addButton"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5 ">
          <Link to="/users/dashboard" style={{ color: "#ed5169" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
