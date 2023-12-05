import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/RegisterStyle.css";
import { handleRegistration } from "../../../adapters/AdminRegistration";

export default function AdminRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    image: "",
    otp: null,
  });
  const [otpBoxVisible, setOtpBoxVisible] = useState(false);
  const [otpButton, setOtpButton] = useState(false);
  const [registerButton, setRegisterButton] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register", formData);
    handleRegistration(
      formData,
      setFormData,
      setOtpBoxVisible,
      setOtpButton,
      setRegisterButton
    );
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
              <h1 className="text-center">Registration Form</h1>
            </div>
            <form
              action=""
              method="post"
              className="form"
              enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="py-3 mx-5">
                <label htmlFor="email" className="form-label">
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
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  className="form-control p-2"
                  placeholder="Enter Your Password"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>

              <div className="py-3 mx-5">
                <input
                  type="file"
                  name="image"
                  value={formData.image}
                  className="form-control p-2"
                  placeholder="Upload  Picture:"
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                  }}
                />
              </div>

              <div
                id="otpBox"
                className="py-3 mx-5"
                style={{ display: otpBoxVisible ? "block" : "none" }}
              >
                <label htmlFor="otp" className="form-label">
                  OTP:
                </label>
                <input
                  type="number"
                  name="otp"
                  className="form-control p-2"
                  id="otpInput"
                  value={formData.otp || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, otp: e.target.value });
                  }}
                />
              </div>

              <div
                className="py-3 mx-5 text-center text-white"
                id="submitOtpButton"
                style={{ display: otpButton ? "block" : "none" }}
              >
                <input
                  type="Submit"
                  className="btn text-white"
                  value="Submit"
                  id="registerOtpButton"
                />
              </div>

              <div
                className="py-3 mx-5 text-center text-white"
                id="registerButton"
                style={{ display: registerButton ? "block" : "none" }}
              >
                <input
                  type="Submit"
                  className="btn text-dark"
                  value="Register"
                />
              </div>
              <div className="py-3 mx-5 d-flex justify-content-center">
                <p>Do you want to log in?</p>
                <Link to="/auth/login">Log In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
