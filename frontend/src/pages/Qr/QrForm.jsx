import React, { useState } from "react";
import { pageLoad, getQrData, getMailData, changeImageSize } from "./Qr";
import "../../css/style.css";

export default function QrGenerator() {
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
          <a href="/qrs" className="navbar-brand">
            <h2 className="logo">QRcode Generator</h2>
          </a>

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
                <a href="/users/profile" className="nav-link">
                  <i className="fa-solid fa-user"></i>
                </a>
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="box">
              <div className="qrHeader">
                <h1>QR Code Generator</h1>
                <form className="contact_form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Type your text or URL"
                    id="qrText"
                    required
                    value={qrData.name}
                    onChange={(e) => {
                      setqrData({ name: e.target.value });
                    }}
                  />
                  <div>
                    <label for="Sizes">Select Size: </label>
                    <select
                      id="sizes"
                      name="size"
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

                  <div className="mailbutton">
                    <button
                      type="button"
                      className="mailbtn"
                      id="mailbtn"
                      style={{ display: " none" }}
                      onSubmit={handleEmailSubmit}
                    >
                      Send email
                    </button>
                  </div>

                  <div className="qrfooter">
                    <button
                      type="button"
                      className="footer2"
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
          <div className="col-md-6">
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
