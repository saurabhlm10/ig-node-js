import { ENV } from "../constants";
import CryptoJS from "crypto-js";

export function decrypt(encryptedKey: string) {
  return CryptoJS.AES.decrypt(encryptedKey, ENV.cryptoSecret).toString(
    CryptoJS.enc.Utf8
  );
}

export function decryptAll(pageSecrets: any) {
  const decryptedSecrets: any = {};
  for (const key in pageSecrets) {
    decryptedSecrets[key] = key.startsWith("encrypted")
      ? decrypt(pageSecrets[key])
      : pageSecrets[key];
  }

  return decryptedSecrets;
}
