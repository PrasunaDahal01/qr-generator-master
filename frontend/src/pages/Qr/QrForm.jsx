import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  pageLoad,
  getQrData,
  getMailData,
  changeImageSize,
} from "../../adapters/Qr";

export default function QrForm() {
  const [qrData, setqrData] = useState({
    name: "",
    img: "",
  });
  const [mailData, setmailData] = useState({
    email: "",
  });
  const [sizeData, setsizeData] = useState({
    size: "",
  });
  const [adminRole, setAdminRole] = useState(false);
  const [mailButton, setMailButton] = useState(false);
  const [mailInput, setMailInput] = useState(false);
  const [qrImage, setQrImage] = useState(false);

  const qrImageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    getQrData(qrData, setMailButton, setMailInput, setQrImage);
  };

  const logOut = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "http://localhost:3000/auth/login";
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    getMailData(mailData, qrImage);
  };

  useEffect(() => {
    pageLoad(setAdminRole);
  }, []); //put the props userdata or something here

  return (
    <div>
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
                <Link
                  to="/users/dashboard"
                  className="nav-link"
                  style={{ display: adminRole ? "block" : "none" }}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/auth/profile" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </Link>
              </li>
              <li className="nav-item">
                <button id="logOut" className="nav-link" onClick={logOut}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="container pt-5 "
        style={{ width: "800px", marginTop: "200px" }}
      >
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow ">
              <div className="card-body">
                <div className="py-1 header text-center">
                  <h1>QR Code Generator</h1>
                </div>
                <form className="form">
                  <div className="py-3 mx-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Type your text or URL"
                      id="qrText"
                      required
                      className="form-control p-2"
                      value={qrData.name}
                      onChange={(e) => {
                        setqrData({ name: e.target.value });
                      }}
                    />
                  </div>

                  <div className="py-3 mx-5">
                    <label className="form-label" htmlFor="Sizes">
                      Select Size:
                    </label>
                    <select
                      id="sizes"
                      name="size"
                      className="form-control p-2 my-3"
                      value={sizeData.size}
                      onChange={(e) => {
                        const newSize = e.target.value;
                        setsizeData({ size: newSize });
                        changeImageSize(newSize, qrImageRef.current);
                      }}
                    >
                      <option value="100">100 x 100</option>
                      <option value="200">200 x 200</option>
                      <option value="300">300 x 300</option>
                      <option value="400">400 x 400</option>
                    </select>
                  </div>

                  <div className="py-3 mx-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Type your Email ID"
                      id="email"
                      value={mailData.email}
                      className="form-control p-2 my-3"
                      onChange={(e) => {
                        setmailData({ email: e.target.value });
                      }}
                      style={{ display: mailInput ? "block" : "none" }}
                    />
                  </div>

                  <div className="py-3 mx-5 text-center">
                    <button
                      type="button"
                      className="btn button"
                      id="mailbtn"
                      onClick={handleEmailSubmit}
                      style={{ display: mailButton ? "block" : "none" }}
                    >
                      Send email
                    </button>
                  </div>

                  <div className="py-3 mx-5 text-center">
                    <button
                      type="button"
                      className="btn button"
                      id="btn"
                      onClick={handleSubmit}
                    >
                      Generate QR CODE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="col-md-4 mx-auto imgBox"
            style={{ display: qrImage ? "block" : "none" }}
          >
            <div className="qrBody">
              <img
                id="base64image"
                src={qrImage}
                alt="qrImage"
                ref={qrImageRef}
                className="imageqr"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
