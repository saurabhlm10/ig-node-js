import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";
import IGPageModel from "../../model/IGPage";
import { Types } from "mongoose";

export const addPageToBatch = async (req: Request, res: Response) => {
  try {
    const { page: pageName } = req.body;

    // Find the page by name
    const page = await IGPageModel.findOne({ name: pageName });
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Check if the page already exists in any batch
    const existingBatch = await BatchModel.findOne({
      pages: { $elemMatch: { $eq: page._id } },
    });
    if (existingBatch) {
      return res
        .status(400)
        .json({ message: "Page already exists in a batch" });
    }

    // Find the batch with the least number of pages and add the page to it
    const batch = await BatchModel.aggregate([
      { $addFields: { numPages: { $size: "$pages" } } },
      { $sort: { numPages: 1 } },
      { $limit: 1 },
    ]);

    if (!batch.length) {
      return res.status(404).json({ message: "Batch not found" });
    }

    batch[0].pages.push(page._id);
    await BatchModel.updateOne(
      { _id: batch[0]._id },
      { pages: batch[0].pages }
    );

    res.json({ message: "Page added to batch successfully", data: batch[0] });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
