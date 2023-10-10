function splitContent(content) {
  const [uuid, qrTextValue] = content.split("-");
  return { uuid, qrTextValue };
}

module.exports = splitContent;
