import { Request, Response } from "express";

export const cloudUpload = async (req: Request, res: Response) => {
  try {
    res.status(200).send({
      message: "Media Uploaded To Cloud Successfully",
      url: req.secure_url,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
};
