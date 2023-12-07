import React, { useState } from "react";
import { forgetPassword } from "../../adapters/Forget";

export default function ForgetPasswordForm() {
  const [formData, setFormData] = useState({ email: " " });
  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword(formData);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <h2 className="logo">QRcode Generator</h2>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <div className="row ">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">Forgot Your Password?</h1>
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
                      value={formData.email}
                      className="form-control p-2"
                      placeholder="example@gmail.com"
                      required
                      onChange={(e) => {
                        setFormData({ email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="py-3 mx-5 text-center text-white">
                    <input
                      type="Submit"
                      className="btn button"
                      value="Send Link"
                    />
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
