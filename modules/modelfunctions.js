const Qr = require("./qr/qr.model");
const ScanInfo = require("./scan/scan.model");

async function createQr(code) {
  const qr = new Qr({
    code,
  });
  const result = await qr.save();
  console.log(result);
}

async function createscan(qrId, ip, count) {
  try {
    const qr = await qr.findById(qrId);
    if (!qr) {
      console.log("QR code not found.");
      return;
    }
    const scaninfo = new ScanInfo({
      qrId: qrId,
      ip: ip,
      count: count,
    });
    const result = await scaninfo.save();
    console.log(result);
  } catch (error) {
    console.error("Error creating ScanInfo:", error);
  }
}

module.exports = {
  createQr,
  createscan,
};
