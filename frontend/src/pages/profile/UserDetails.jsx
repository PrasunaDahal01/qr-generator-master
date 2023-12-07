import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pageLoad from "../../adapters/Profile";

export default function UserDetails() {
  const [formData, setFormData] = useState({ image: "", email: "", role: "" });

  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await pageLoad();
        setFormData({ image: user.image, email: user.email, role: user.role });
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchData();
  }, []);
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
                <button className="nav-link" id="logOut" onclick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-5">
        <div className="row ">
          <div className="col-12 col-sm-8 col-md-8 col-xl-12 m-auto">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1 className="text-center">My Profile</h1>
                </div>
                <div>
                  <p>
                    <img
                      src={`../../public/userImages/${formData.image}`}
                      width="100px"
                      height="100px"
                      alt={formData.image}
                    />
                  </p>
                  <p>Email:{formData.email}</p>
                  <p>Role:{formData.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 mx-5">
          <Link to="/auth/updateProfile" style={{ color: "#ed5169" }}>
            <h5>Edit My Profile</h5>
          </Link>
          <Link to="/auth/changePassword" style={{ color: "#ed5169" }}>
            <h5>Change password</h5>
          </Link>
        </div>
      </div>
    </>
  );
}
