import { get, post } from "../lib/requestManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const pageLoad = async (setAdminRole) => {
  try {
    const response = await get({
      endpoint: "/api/v1/users/qrs",
      headers: { "Content-Type": "application/json" },
    });

    const userRole = response.user.role;

    if (userRole === "admin") {
      setAdminRole(true);
    } else {
      setAdminRole(false);
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};

const getQrData = async (qrData, setMailButton, setMailInput, setQrImage) => {
  if (!qrData.name.trim()) {
    alert("Please enter your QrText");
  } else {
    const qrText = qrData.name;
    try {
      const response = await post({
        endpoint: "/api/v1/qrs/location",
        headers: { "Content-Type": "application/json" },
        params: { location: qrText },
      });

      const data = await response;

      setQrImage(data.qr);

      setMailInput(true);
      setMailButton(true);
    } catch (error) {
      throw error;
    }
  }
};

const getMailData = async (mailData, qrImage) => {
  if (!mailData.email.trim()) {
    alert("Please enter your Email ID.");
  } else {
    try {
      const email = mailData.email;
      await post({
        endpoint: "/api/v1/mails",
        headers: { "Content-Type": "application/json" },
        params: { qrCode: qrImage, email: email },
      });
      showToast("Email Sent.", "success");
    } catch (error) {
      throw error;
    }
  }
};

function changeImageSize(newSize, qrImage) {
  qrImage.width = newSize;
  qrImage.height = newSize;
}
function showToast(message, type) {
  if (type === "success") {
    toast.success(message, { position: "top-center" });
  } else if (type === "error") {
    toast.error(message, { position: "top-center" });
  }
}
export { pageLoad, getQrData, getMailData, changeImageSize };
