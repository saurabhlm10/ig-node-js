import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";
import IGPageModel from "../../model/IGPage";

export const deleteSecret = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    // Find the page by name
    const pageExists = await IGPageModel.findOne({ name: page });
    if (!pageExists) {
      return res.status(404).json({ message: "Page not found" });
    }

    await SecretModel.findOneAndDelete({ page });
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
