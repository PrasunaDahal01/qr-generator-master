import { login } from "../../adapters/Login";
import "../../css/RegisterStyle.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="box">
      <div className="row custom-row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <div className="container rounded my-2 px-0 insideContainer">
            <div
              id="messageBox"
              className="message-box py-3 mx-5 px-5 justify-content-center"
            ></div>
            <div className="py-1 header">
              <h1 className="text-center">Login Form</h1>
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
                  className="form-control p-2"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ email: e.target.value });
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
                  className="form-control p-2"
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
                  className="btn"
                  id="loginButton"
                  value="Login"
                />
              </div>

              <div className="d-flex justify-content-center">
                <a href="/auth/forgetPassword">Forgot Password?</a>
              </div>

              <div className="d-flex justify-content-center">
                <Link
                  to="/auth/registers"
                  style={{
                    color: "#212a3e",
                    fontWeight: 900,
                  }}
                >
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
