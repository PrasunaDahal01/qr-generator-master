import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { changePassword, pageLoad } from "../../adapters/Change";

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({ password: "", newpassword: "" });
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(userId, formData);
  };

  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await pageLoad();
        setUserId(userId._id);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchData();
  }, []);
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
                <button id="logOut" className="nav-link" onClick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">Change Your Password:</h1>
                </div>
                <form
                  action=""
                  method="post"
                  className="form"
                  onSubmit={handleSubmit}
                >
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
                        setFormData({
                          ...formData,
                          newpassword: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>

                  <div className="py-3 mx-5 text-center text-white">
                    <input
                      type="Submit"
                      className="btn button"
                      value="Change Password"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5">
          <Link to="/auth/profile" style={{ color: "#ed5169" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
