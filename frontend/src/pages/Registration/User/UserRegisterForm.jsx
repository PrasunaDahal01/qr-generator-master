import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  handleRegistration,
  regenerateOtp,
} from "../../../adapters/UserRegistration";

export default function UserRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: null,
  });
  const [imageData, setImageData] = useState({ image: "" });
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(15);
  const [otpBoxVisible, setOtpBoxVisible] = useState(false);
  const [registerButton, setRegisterButton] = useState(true);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    await handleRegistration(
      formData,
      imageData,
      setFormData,
      setOtpBoxVisible,
      setRegisterButton
    );
  };

  const resendOTP = async () => {
    setMinutes(5);
    setSeconds(5);
    await regenerateOtp({ email: formData.email });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
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
                  encType="multipart/form-data"
                  onSubmit={handleRegisterSubmit}
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
                    className="py-3 mx-5 countdown-text"
                    style={{ display: otpBoxVisible ? "block" : "none" }}
                  >
                    {seconds > 0 || minutes > 0 ? (
                      <p style={{ color: "grey" }}>
                        Time Remaining:
                        <span style={{ color: "#ed5169" }}>
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      </p>
                    ) : (
                      <p style={{ color: "grey" }}>Didn't receive code?</p>
                    )}
                    <button
                      className="btn button text-white"
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color:
                          seconds > 0 || minutes > 0 ? "#dfe3e8" : "#ff5630",
                      }}
                      onClick={resendOTP}
                    >
                      resend OTP
                    </button>
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
