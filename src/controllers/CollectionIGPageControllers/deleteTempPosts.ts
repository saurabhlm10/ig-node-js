import { Request, Response } from "express";
import TempPost from "../../model/TempPost.js";

export const deleteTempPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).send("Page name is required");
    }

    await TempPost.deleteMany({
      status: "processed",
      page,
    });

    res.status(200).send("Deleted Temp Posts for " + page);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json(error.message);
    } else {
      console.log('An unexpected error occurred', error);
    }
  }
};
