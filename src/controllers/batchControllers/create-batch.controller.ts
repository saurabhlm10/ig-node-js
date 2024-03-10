import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";
import { encrypt } from "../../helpers/encrypt";

export const createBatch = async (req: Request, res: Response) => {
  try {
    const { name, access_token } = req.body;

    if (!(name && access_token))
      return res
        .status(400)
        .json({ message: "name and access_token required" });

    const encrypted_access_token = encrypt(access_token);

    console.log("encrypted_access_token", encrypted_access_token);

    const createdBatch = await BatchModel.create({
      name,
      encrypted_access_token,
    });

    res
      .status(201)
      .json({ message: "Batch created successfully", data: createdBatch });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
