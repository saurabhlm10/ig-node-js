import { Request, Response } from "express";
import IGPageModel from "../../model/IGPage";

export const getAllIGPages = async (req: Request, res: Response) => {
  try {
    const pages = await IGPageModel.find({});
    res.status(200).send(pages);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
