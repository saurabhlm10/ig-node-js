import { Request, Response } from "express";
import CollectionIGPage from "../../model/CollectionIGPage";

export const deleteCollectionIGPage = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;

    if (!page) return res.status(400).json({ message: "page is required" });

    const collectionIGPage = await CollectionIGPage.findOne({ username: page });

    if (!collectionIGPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    await CollectionIGPage.deleteOne({ username: page });

    return res.status(200).json({ message: "Page Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
