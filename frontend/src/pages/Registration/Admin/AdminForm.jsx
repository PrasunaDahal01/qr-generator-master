import React from "react";

export default function AdminForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    image: "",
    otp: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("register", formData);
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
              onSubmit={handleSubmit}
            >
              <div className="py-3 mx-5">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <label htmlFor="" className="form-label"></label>
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
                    setFormData({ password: e.target.value });
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
                    setFormData({ image: e.target.value });
                  }}
                />
              </div>

              <div
                id="otpBox"
                className="py-3 mx-5"
                style={{ display: "none" }}
              >
                <label htmlFor="otp" className="form-label">
                  OTP:
                </label>
                <input
                  type="number"
                  name="otp"
                  className="form-control p-2"
                  id="otpInput"
                  value={formData.otp}
                  onChange={(e) => {
                    setFormData({ otp: e.target.value });
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
                className="py-3 mx-5 text-center text-white"
                id="registerButton"
              >
                <input
                  type="Submit"
                  className="btn text-white"
                  value="Register"
                />
              </div>
              <div className="py-3 mx-5 d-flex justify-content-center">
                <p>Do you want to log in?</p>
                <a href="/auth/login">Log In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
