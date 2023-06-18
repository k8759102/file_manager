const CryptoJS = require("crypto-js");

const encodeBySHA256 = (data) => CryptoJS.SHA256(data).toString();

const encodeByAES56 = (key, data) => {
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString();
};

const decodeByAES256 = (key, data) => {
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return cipher.toString(CryptoJS.enc.Utf8);
};

const randomString = (length = 32) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let str = "";

  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

module.exports = {
  encodeBySHA256,
  encodeByAES56,
  decodeByAES256,
  randomString,
};
