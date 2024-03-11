import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import { encrypt } from "../../helpers/encrypt";
import IGPageModel from "../../model/IGPage";

export const createSecret = async (req: Request, res: Response) => {
  try {
    const { page, apify_key, ig_user_id } = req.body;

    // Find the page by name
    const pageExists = await IGPageModel.findOne({ name: page });
    if (!pageExists) {
      return res.status(404).json({ message: "Page not found" });
    }

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
