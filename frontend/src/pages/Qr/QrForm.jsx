import React, { useState } from "react";
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

  window.addEventListener("load", () => {
    pageLoad();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getQrData({ qrText: qrData.name, img: qrData.img });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    getMailData(mailData);
  };

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
                <button
                  id="adminDashboard"
                  className="nav-link"
                  onclick="getDashboard(event)"
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <Link to="/users/profile" className="nav-link">
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  id="logOut"
                  className="nav-link"
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
          <div className="col-8">
            <div className="card form-box shadow">
              <div className="card-body">
                <div className="py-1 header">
                  <h1>QR Code Generator</h1>
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
                      <label className="form-label" for="Sizes">
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
                          changeImageSize(newSize);
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
                        id="mail"
                        value={mailData.email}
                        onChange={(e) => {
                          setmailData({ email: e.target.value });
                        }}
                        style={{ display: " none" }}
                      />
                    </div>

                    <div className="py-3 mx-5 text-center">
                      <button
                        type="button"
                        className="btn button"
                        id="mailbtn"
                        style={{ display: " none" }}
                        onSubmit={handleEmailSubmit}
                      >
                        Send email
                      </button>
                    </div>

                    <div className="py-3 mx-5 text-center">
                      <button
                        type="button"
                        className="btn button"
                        id="btn"
                        onSubmit={handleSubmit}
                      >
                        Generate QR CODE
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="qrBody">
              <img
                id="base64image"
                src=""
                style={{ display: " none" }}
                alt="qrImage"
                value={qrData.img}
                onChange={(e) => {
                  setqrData({ ...qrData, img: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
