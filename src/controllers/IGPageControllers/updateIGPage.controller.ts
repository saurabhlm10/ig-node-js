import { Request, Response } from "express";
import IGPageModel from "../../model/IGPage";

export const updateIGPage = async (req: Request, res: Response) => {
  try {
    const { page: pageName } = req.params;

    if (!pageName) {
      return res.status(400).json({
        message: "page is required",
      });
    }

    const page = await IGPageModel.findOne({ name: pageName });

    if (!page) {
      return res.status(404).send({ error: "Page not found." });
    }

    const updatedPage = await IGPageModel.findOneAndUpdate(
      { name: pageName },
      { ...req.body },
      { new: true }
    );

    res.status(200).send(updatedPage);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
