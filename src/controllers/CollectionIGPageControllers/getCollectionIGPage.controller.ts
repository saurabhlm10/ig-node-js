import { Request, Response } from "express";
import CollectionIGPage from "../../model/CollectionIGPage";

export const getCollectionIGPage = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;

    if (!page) {
      return res.status(400).json({ message: "page is required" });
    }

    const collectionIGPage = await CollectionIGPage.findOne({ username: page });

    if (!collectionIGPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    return res.status(200).json(collectionIGPage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
