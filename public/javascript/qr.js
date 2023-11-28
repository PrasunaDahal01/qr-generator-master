const pageLoad = async () => {
  try {
    const response = await get({
      endpoint: '/api/v1/users/qrs',
      headers: { 'Content-Type': 'application/json' },
    });

    const userRole = response.user.role;
    const dashBoard = document.getElementById('adminDashboard');

    if (userRole === 'admin') {
      dashBoard.style.display = 'block';
    } else {
      dashBoard.style.display = 'none';
    }
  } catch (error) {
    console.log('errorr', error);
    throw error;
  }
};

async function getQrData() {
  const qrText = document.getElementById('qrText').value;
  const emailbutton = document.getElementById('mailbtn');
  const emailinput = document.getElementById('mail');
  const imageQr = document.getElementById('base64image');
  if (qrText.trim() === '') {
    alert('Please enter text or URL before generating QR CODE.');
  } else {
    try {
      const response = await post({
        endpoint: '/api/v1/qrs',
        headers: { 'Content-Type': 'application/json' },
        params: { name: qrText },
      });

      const data = await response;

      document.getElementById('base64image').src = data.qr;
      imageQr.style.display = 'block';
      emailbutton.style.display = 'block';
      emailinput.style.display = 'block';
    } catch (error) {
      throw new Error(`Fetch request failed with status ${response.status}`);
      console.error('error', error);
    }
  }
}

async function getMailData() {
  const mailbutton = document.getElementById('mailbtn');
  const email = document.getElementById('mail').value;
  if (!email.trim()) {
    alert('Please enter your Email ID.');
  } else {
    const qr = document.getElementById('base64image').src;
    console.log('email', email);
    console.log('qr', qr);

    try {
      const response = await post({
        endpoint: '/api/v1/mails',
        headers: { 'Content-Type': 'application/json' },
        params: { qrCode: qr, email: email },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function changeImageSize() {
  const selectedSize = document.getElementById('sizes').value;
  const image = document.getElementById('base64image');
  image.width = selectedSize;
  image.height = selectedSize;
}
