module.exports.decodeToken = (_token: string) => {
  return JSON.parse(Buffer.from(_token.split(".")[1], "base64").toString());
};
