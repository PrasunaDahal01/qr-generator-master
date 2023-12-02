import React from "react";

export default function ForgetForm() {
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
              <h1 className="text-center">Forgot Your Password?</h1>
            </div>
            <form action="" method="post" className="form">
              <div className="py-3 mx-5">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control p-2"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="py-3 mx-5 text-center text-white">
                <input
                  type="Submit"
                  className="btn text-white"
                  value="Send Link"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}