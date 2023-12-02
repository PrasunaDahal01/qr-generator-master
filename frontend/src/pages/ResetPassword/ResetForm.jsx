import React from "react";

export default function ResetForm() {
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
                <input type="Submit" className="btn text-white" value="Reset" />
              </div>
              <div className="d-flex justify-content-center">
                <p>Do you want to login?</p>
                <a href="/auth/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
