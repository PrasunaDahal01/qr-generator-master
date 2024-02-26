import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pageLoad, updateProfile } from "../../adapters/Update";

export default function UpdateForm() {
  const [emailData, setEmailData] = useState({ email: " " });
  const [imageData, setImageData] = useState({ image: "" });
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(userId, emailData, imageData);
    const user = await pageLoad();
    setEmailData({ email: user.email });
    setImageData({ image: user.image });
  };
  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await pageLoad();
        setEmailData({ email: user.email });
        setImageData({ image: user.image });
        setUserId(user._id);
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
                <button className="nav-link" id="logOut" onClick={logOut}>
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
                <div className="py-3 mx-5" id="userImage">
                  <img
                    src={`http://localhost:3001/public/userImages/${imageData.image}`}
                    width="100px"
                    height="100px"
                    alt={imageData.image}
                  />
                </div>

                <form
                  action=""
                  method="post"
                  className="form"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <div className="py-3 mx-5">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={emailData.email}
                      className="form-control p-2"
                      onChange={(e) => {
                        setEmailData((prevFormData) => ({
                          ...prevFormData,
                          email: e.target.value,
                        }));
                      }}
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div className="py-3 mx-5">
                    <input
                      type="file"
                      name="image"
                      className="form-control p-2"
                      onChange={(e) => {
                        setImageData((prevFormData) => ({
                          ...prevFormData,
                          image: e.target.files[0],
                        }));
                      }}
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
          <Link to="/auth/profile" style={{ color: "#ed5169" }}>
            Go Back
          </Link>
        </div>
      </div>
    </>
  );
}
