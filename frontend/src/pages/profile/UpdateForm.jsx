import React from "react";
import { Link } from "react-router-dom";

export default function UpdateForm() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <Link to="/qrs" className="navbar-brand">
            <h2 className="logo">QRcode Generator</h2>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="nav-link"
                  id="logOut"
                  onclick="logOut(event)"
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">Edit Your Profile:</h1>
                </div>
                <div className="py-3 mx-5" id="userImage"></div>

                <form
                  action=""
                  method="post"
                  className="form"
                  enctype="multipart/form-data"
                >
                  <div id="userId"></div>

                  <div className="py-3 mx-5">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <div id="userEmail"></div>
                  </div>

                  <div className="py-3 mx-5">
                    <input
                      type="file"
                      name="image"
                      className="form-control p-2"
                      placeholder="Upload picture"
                    />
                  </div>
                  <div className="py-3 mx-5 text-center ">
                    <input
                      type="Submit"
                      className="btn button"
                      value="Update"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5">
          <Link to="/users/profile" style={{ color: "#ed5169" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
