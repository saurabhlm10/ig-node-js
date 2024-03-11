import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import IGPageModel from "../../model/IGPage";

export const getSecret = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    // Find the page by name
    const pageExists = await IGPageModel.findOne({ name: page });
    if (!pageExists) {
      return res.status(404).json({ message: "Page not found" });
    }

    const secret = await SecretModel.findOne({ page });
    if (!secret) {
      return res.status(404).json({ message: "Secret not found" });
    }
    res.status(200).json(secret);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};
