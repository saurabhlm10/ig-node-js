import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";

export const getAllBatches = async (req: Request, res: Response) => {
  try {
    const batches = await BatchModel.find();

    if (batches.length === 0) {
      return res
        .status(404)
        .json({ message: "No batches found.", batches: [] });
    }
    res.status(200).json(batches);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res
        .status(500)
        .send({ error: "Internal Server Error.", message: error.message });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
