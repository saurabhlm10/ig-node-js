import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import { encrypt } from "../../helpers/encrypt";

export const createSecret = async (req: Request, res: Response) => {
  try {
    const { page, apify_key, ig_user_id } = req.body;

    const encrypted_apify_key = encrypt(apify_key);

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
