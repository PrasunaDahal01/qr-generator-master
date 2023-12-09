import { login } from "../../adapters/Login";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <h2 className="logo">QRcode Generator</h2>
        </div>
      </nav>

      <div className="container mt-5 pt-5 ">
        <div className="row ">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto ">
            <div className="card form-box shadow">
              <div className="card-body ">
                <div className="text-center user-icon py-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70"
                    height="70"
                    fill="currentColor"
                    class="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>

                <form
                  action=""
                  method="post"
                  className="form"
                  onSubmit={handleSubmit}
                >
                  <div className="py-3 mx-5">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control py-2 my-3"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      required
                    />
                  </div>

                  <div className="py-3 mx-5">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control py-2 my-3"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>

                  <div className="py-3 mx-5 text-center ">
                    <input
                      type="Submit"
                      className="btn button"
                      id="loginButton"
                      value="Login"
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <Link
                      to="/auth/forgetPassword"
                      style={{ color: "#ed5169" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="d-flex justify-content-center">
                    <Link
                      to="/auth/registers"
                      className="my-link"
                      style={{ color: "#ed5169" }}
                    >
                      Create New Account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
