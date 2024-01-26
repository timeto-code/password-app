import CryptoJS from "crypto-js";

export const encrypt = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(data, process.env.ENCRYPTION_KEY!);
  return encrypted.toString();
};

export const decrypt = (data: string) => {
  const decrypted = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_KEY!);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
