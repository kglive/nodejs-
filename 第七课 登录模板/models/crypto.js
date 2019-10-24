const Uuid = require('node-uuid');
const CryptoJS = require('crypto-js');
const { secretKey } = require('../config');

module.exports = {
  // 生成36为长度的uuid字符串
  uuid36 () {
    return Uuid.v1();
  },
  // 加密
  encrypt (plaintext) {
    return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  },
  // 解密
  decrypt (ciphertext) {
    let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
