import { Request, Response } from "express";
import CollectionIGPage from "../../model/CollectionIGPage";
import IGPageModel from "../../model/IGPage";

export const updateCollectionIGPage = async (req: Request, res: Response) => {
  try {
    const { page } = req.params;

    const igpage = req.body.page;

    if (!page) return res.status(400).json({ message: "page is required" });

    const validIGPage = await IGPageModel.findOne({ name: igpage });

    if (!validIGPage) {
      return res.status(400).json({ message: "Invalid IG Page" });
    }

    const collectionIGPage = await CollectionIGPage.findOne({ username: page });

    if (!collectionIGPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    const updatedPage = await CollectionIGPage.findOneAndUpdate(
      { username: page },
      { ...req.body },
      { new: true }
    );

    return res.status(200).json(updatedPage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
