import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import IGPageModel from "../../model/IGPage";

export const updateSecret = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    // Find the page by name
    const pageExists = await IGPageModel.findOne({ name: page });
    if (!pageExists) {
      return res.status(404).json({ message: "Page not found" });
    }

    const updatedSecret = await SecretModel.findOneAndUpdate(
      { page },
      req.body,
      { new: true }
    );
    res.json(updatedSecret);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
