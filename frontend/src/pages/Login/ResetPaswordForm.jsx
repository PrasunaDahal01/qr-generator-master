import React from "react";
import { Link } from "react-router-dom";

export default function ResetPasswordForm() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <h2 className="logo">QRcode Generator</h2>
        </div>
      </nav>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">Reset Your Password:</h1>
                </div>
                <form action="" method="post" className="form">
                  <input type="hidden" name="userId" value="<%= userId %>" />

                  <div className="py-3 mx-5">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control p-2"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  <div className="py-3 mx-5 text-center text-white">
                    <input type="Submit" className="btn button" value="Reset" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p>Do you want to login?</p>
                    <Link to="/auth/login" style={{ color: "#ed5169" }}>
                      Login
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
