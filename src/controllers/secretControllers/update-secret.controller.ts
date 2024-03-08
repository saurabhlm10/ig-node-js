import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";

export const updateSecret = async (req: Request, res: Response) => {
  try {
    const updatedSecret = await SecretModel.findOneAndUpdate(
      { page: req.query.page },
      req.body,
      { new: true }
    );
    res.json(updatedSecret);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
