import CryptoJS from "crypto-js";
import { ENV } from "../constants";
export function encrypt(data: string) {
  const cryptoSecret = ENV.cryptoSecret;

  const encrypted_data = CryptoJS.AES.encrypt(data, cryptoSecret).toString();

  return encrypted_data;
}
