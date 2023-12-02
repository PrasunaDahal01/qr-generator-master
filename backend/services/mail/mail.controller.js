const { transporter } = require("./mail.service");
class Mail {
  async sendEMail(body) {
    const qrCodes = body.qrCode.replace("data:image/png;base64,", ""),
      mailOptions = {
        from: "your-email@gmail.com",
        to: body.email,
        subject: "QR Code",
        text: "Here is your QR code.",
        attachments: [
          {
            filename: "qr-code.png",
            content: Buffer.from(qrCodes, "base64"),
            cid: "Image_ID",
            contentDisposition: "inline",
          },
        ],
      };
    return transporter.sendMail(mailOptions);
  }
}

module.exports = new Mail();
