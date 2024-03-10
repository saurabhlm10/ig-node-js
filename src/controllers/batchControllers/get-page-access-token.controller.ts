import { Request, Response } from "express";
import BatchModel from "../../model/Batch.model";
import IGPageModel from "../../model/IGPage";
import { decrypt } from "../../helpers/decrypt";

export const getPageAccessToken = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;

    const result = await IGPageModel.aggregate([
      { $match: { name: page } },
      {
        $lookup: {
          from: BatchModel.collection.name,
          localField: "_id",
          foreignField: "pages",
          as: "batch",
        },
      },
      { $unwind: "$batch" },
    ]);

    console.log(result);

    if (!result.length) {
      return res.status(404).json({ message: "Page or batch not found" });
    }

    // Decrypt the access token
    const decryptedAccessToken = decrypt(
      result[0].batch.encrypted_access_token
    ); // Replace with your decryption function

    console.log("decryptedAccessToken", decryptedAccessToken);

    res.json({ accessToken: decryptedAccessToken });
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
