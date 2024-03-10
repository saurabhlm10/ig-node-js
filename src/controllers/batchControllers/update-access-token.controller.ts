// src/controllers/BatchControllers/updateaccess_token.controller.ts
import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";
import { encrypt } from "../../helpers/encrypt";
import IGPageModel from "../../model/IGPage";

export const updateAccessToken = async (req: Request, res: Response) => {
  try {
    const { access_token, page: pageName, batch: batchName } = req.body;

    // Encrypt the access token
    const encryptedaccess_token = encrypt(access_token); // Replace with your encryption function

    console.log("access_token", access_token);

    console.log("encryptedaccess_token", encryptedaccess_token);

    if (pageName) {
      // If a page name is provided, find the corresponding batch and update the access token
      const result = await IGPageModel.aggregate([
        { $match: { name: pageName } },
        {
          $lookup: {
            from: BatchModel.collection.name,
            localField: "_id",
            foreignField: "pages",
            as: "batch",
          },
        },
        { $unwind: "$batch" },
        { $set: { "batch.encrypted_access_token": encryptedaccess_token } },
        { $out: BatchModel.collection.name },
      ]);

      if (!result.length) {
        return res.status(404).json({ message: "Page or batch not found" });
      }
    } else if (batchName) {
      // If a batch name is provided, update the access token
      const batch = await BatchModel.findOneAndUpdate(
        { name: batchName },
        { encrypted_access_token: encryptedaccess_token },
        { new: true }
      );

      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Either pageName or batchName must be provided" });
    }

    res.json({ message: "Access token updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
