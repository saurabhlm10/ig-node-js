import { Request, Response } from "express";
import { months } from "../../constants/months";
import { pages } from "../../constants/pages";
import { getPageInfo } from "../../helpers/getPageInfo";
import CollectionIGPage from "../../model/CollectionIGPage";
import MonthStatus from "../../model/MonthStatus";

export const updateAllPages = async (req: Request, res: Response) => {
  try {
    const date = new Date();
    const currentMonthName = months[date.getMonth()];

    let currentMonthInDB = await MonthStatus.findOne({ name: currentMonthName });

    if (!currentMonthInDB) {
      currentMonthInDB = await MonthStatus.create({ name: currentMonthName });
    }

    console.log("Updating Pages for ", currentMonthName);

    const updatedPages = await getPageInfo(pages);
    console.log("Got Pages From Apify. Updating DB.");

    const updatedPagesInDB = await Promise.all(
      updatedPages.map(async (page) => {
        const { username, followersCount } = page;

        const updatedPage = await CollectionIGPage.findOneAndUpdate(
          { username },
          { followersCount },
          { new: true }
        );

        return updatedPage;
      })
    );

    console.log("DB Updated");

    currentMonthInDB.status = "success";
    currentMonthInDB.statusMessage = "Updated Successfully";
    await currentMonthInDB.save();

    res.status(200).send('DB Updated');
  } catch (error) {
    console.error("Error updating pages:", error);

    const date = new Date();
    const currentMonthName = months[date.getMonth()];

    // Update Error Message in DB
    await MonthStatus.findOneAndUpdate(
      { name: currentMonthName },
      {
        status: "fail",
        statusMessage: error instanceof Error ? error.message : "Unknown error",
      }
    );

    res.status(500).send('An error occurred while updating the pages');
  }
};
