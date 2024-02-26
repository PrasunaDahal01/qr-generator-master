import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleRegistration } from "../../../adapters/AdminRegistration";

export default function AdminRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: null,
  });
  const [imageData, setImageData] = useState({ image: "" });
  const [otpBoxVisible, setOtpBoxVisible] = useState(false);
  const [registerButton, setRegisterButton] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegistration(
      formData,
      imageData,
      setFormData,
      setOtpBoxVisible,
      setRegisterButton
    );
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
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
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
                      className="form-control p-2"
                      placeholder="Upload  Picture:"
                      required
                      onChange={(e) => {
                        setImageData({ image: e.target.files[0] });
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
                    style={{ display: otpBoxVisible ? "block" : "none" }}
                  >
                    <input
                      type="Submit"
                      className="btn button"
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
                      className="btn button"
                      value="Register"
                    />
                  </div>
                  <div className="py-3 mx-5 d-flex justify-content-center">
                    <p>Do you want to log in?</p>
                    <Link to="/auth/login" style={{ color: "#ed5169" }}>
                      Log In
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
