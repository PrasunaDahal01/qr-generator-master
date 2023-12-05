import { get, post } from "../lib/requestManager";
const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/qrs",
      headers: { "Content-Type": "application/json" },
    });

    const userRole = response.user.role;
    const dashBoard = document.getElementById("adminDashboard");

    if (userRole === "admin") {
      dashBoard.style.display = "block";
    } else {
      dashBoard.style.display = "none";
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const getQrData = async (qrText, imageQr) => {
  const emailbutton = document.getElementById("mailbtn");
  const emailinput = document.getElementById("mail");
  if (!qrText.trim()) {
    alert("Please enter your Email ID.");
  } else {
    try {
      const response = await post({
        endpoint: "/api/v1/qrs",
        headers: { "Content-Type": "application/json" },
        params: { name: qrText },
      });

      const data = await response;

      document.getElementById("base64image").src = data.qr;
      imageQr.style.display = "block";
      emailbutton.style.display = "block";
      emailinput.style.display = "block";
    } catch (error) {
      throw error;
    }
  }
};

const getMailData = async (email) => {
  if (!email.trim()) {
    alert("Please enter your Email ID.");
  } else {
    const qr = document.getElementById("base64image").src;
    console.log("qr", qr);
    try {
      await post({
        endpoint: "/api/v1/mails",
        headers: { "Content-Type": "application/json" },
        params: { qrCode: qr, email: email },
      });
    } catch (error) {
      throw error;
    }
  }
};

function changeImageSize(newSize) {
  const image = document.getElementById("base64image");
  image.width = newSize;
  image.height = newSize;
}

export { pageLoad, getQrData, getMailData, changeImageSize };
