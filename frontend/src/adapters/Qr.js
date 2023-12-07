import { get, post } from "../lib/requestManager";
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

const getQrData = async (qrText, setMailButton, setMailInput, setQrImage) => {
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

      setQrImage(data.qr);

      setMailInput(true);
      setMailButton(true);
    } catch (error) {
      throw error;
    }
  }
};

const getMailData = async (email, qrImage) => {
  if (!email.trim()) {
    alert("Please enter your Email ID.");
  } else {
    try {
      await post({
        endpoint: "/api/v1/mails",
        headers: { "Content-Type": "application/json" },
        params: { qrCode: qrImage, email: email },
      });
    } catch (error) {
      throw error;
    }
  }
};

function changeImageSize(newSize, qrImage) {
  qrImage.width = newSize;
  qrImage.height = newSize;
}

export { pageLoad, getQrData, getMailData, changeImageSize };
