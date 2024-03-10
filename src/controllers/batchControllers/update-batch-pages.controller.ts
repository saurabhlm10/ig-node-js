// src/controllers/BatchControllers/updateBatchPages.controller.ts
import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";

export const updateBatchPages = async (req: Request, res: Response) => {
  try {
    const { batchName, pages } = req.body;

    // Find the batch by name and update the pages
    const batch = await BatchModel.findOneAndUpdate(
      { name: batchName },
      { pages: pages },
      { new: true }
    );
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.json({ message: "Batch pages updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
