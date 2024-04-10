const path = require("path");
const qrcode = require("qrcode");
const qrModel = require("./qr.model");
const { v4: uuidv4 } = require("uuid");

async function generateQr(qrTextValue) {
  const uuid = uuidv4();
  const blockSize = 16; // Adjust block size based on requirements
  const errorCorrectionLevel = "M"; // Modify as needed (L, M, Q, H)

  // Split data into blocks
  const blocks = [];
  for (let i = 0; i < qrTextValue.length; i += blockSize) {
    blocks.push(qrTextValue.slice(i, i + blockSize));
  }

  // Calculate XOR parity for each block
  const xorParityBlocks = blocks.map((block) => {
    let parity = 0;
    for (const byte of block) {
      parity ^= byte.charCodeAt(0);
    }
    return { data: block, parity };
  });

  // Encode data blocks with Reed-Solomon error correction
  const qrDataBlocks = xorParityBlocks.map(
    (block) => block.data + String.fromCharCode(block.parity)
  );
  const qr = await qrcode.toDataURL(qrDataBlocks.join("\n"), {
    errorCorrectionLevel,
  });

  // Save QR code data to database
  const payload = { qrText: qrTextValue, qrId: uuid, qrDataURL: qr };

  await qrModel.create(payload);
  return qr;
}

async function generateUserQr(qrTextValue) {
  try {
    const uuid = uuidv4();
    const blockSize = 16; // Adjust block size based on requirements
    const errorCorrectionLevel = "M"; // Modify as needed (L, M, Q, H)

    // Split data into blocks
    const blocks = [];
    for (let i = 0; i < qrTextValue.length; i += blockSize) {
      blocks.push(qrTextValue.slice(i, i + blockSize));
    }

    // Calculate XOR parity for each block
    const xorParityBlocks = blocks.map((block) => {
      let parity = 0;
      for (const byte of block) {
        parity ^= byte.charCodeAt(0);
      }
      return { data: block, parity };
    });

    // Encode data blocks with Reed-Solomon error correction
    const qrDataBlocks = xorParityBlocks.map(
      (block) => block.data + String.fromCharCode(block.parity)
    );
    const qr = await qrcode.toDataURL(qrDataBlocks.join("\n"), {
      errorCorrectionLevel,
    });

    // Save QR code data to database
    const payload = { qrText: qrTextValue, qrId: uuid, qrDataURL: qr };

    await qrModel.create(payload);
    return qr;
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
}

async function generateLocationQr(qrTextValue) {
  const uuid = uuidv4();
  const code = qrcode.toDataURL(qrTextValue);
  const payload = { qrText: qrTextValue, qrId: uuid };
  await qrModel.create(payload);
  return code;
}
module.exports = {
  generateQr,
  generateUserQr,
  generateLocationQr,
};
