import { Request, Response } from "express";
import SecretModel from "../../model/Secret.model";

export const deleteSecret = async (req: Request, res: Response) => {
  try {
    await SecretModel.findOneAndDelete({ page: req.query.page });
    res.sendStatus(204);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
