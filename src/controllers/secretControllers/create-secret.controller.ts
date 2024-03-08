import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import Crypto from "crypto-js";
import { ENV } from "../../constants";

export const createSecret = async (req: Request, res: Response) => {
  try {
    const { page, apify_key, ig_user_id } = req.body;

    console.log(req.body);

    const cryptoSecret = ENV.cryptoSecret;

    const encrypted_apify_key = Crypto.AES.encrypt(
      apify_key,
      cryptoSecret
    ).toString();

    const newSecret = new SecretModel({
      page,
      encrypted_apify_key,
      ig_user_id,
    });
    await newSecret.save();
    res.status(201).json(newSecret);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};
