import React, { useState } from "react";
import { handleRegistration } from "../../javascript/userRegister";

export default function UserForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    image: "",
    otp: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegistration(formData);
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
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  className="form-control p-2"
                  placeholder="example@gmail.com"
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
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  className="form-control p-2"
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <div className="py-3 mx-5">
                <input
                  type="file"
                  name="image"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                  }}
                  className="form-control p-2"
                  placeholder="Enter Your Picture:"
                  required
                />
              </div>

              <div
                id="otpBox"
                className="py-3 mx-5"
                style={{ display: "none" }}
              >
                <label for="otp" className="form-label">
                  OTP:
                </label>
                <input
                  type="number"
                  name="otp"
                  className="form-control p-2"
                  id="otpInput"
                  onChange={(e) => {
                    setFormData({ ...formData, otp: e.target.value });
                  }}
                />
              </div>

              <div
                className="py-3 mx-5 text-center text-white"
                id="submitOtpButton"
                style={{ display: "none" }}
              >
                <input
                  type="Submit"
                  className="btn text-white"
                  value="Submit"
                  id="registerOtpButton"
                />
              </div>

              <div
                id="registerButton"
                className="py-3 mx-5 text-center text-white"
              >
                <input
                  type="Submit"
                  className="btn text-white"
                  value="Register"
                  id="registerbutton"
                />
              </div>

              <div className="py-3 mx-5 d-flex justify-content-center">
                <p>Have an account?</p>
                <p>
                  <a
                    href="/auth/login"
                    style={{ color: "#3876bf", fontWeight: 900 }}
                  >
                    Log In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
