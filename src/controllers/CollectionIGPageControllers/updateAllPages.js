const { months } = require("../../constants/months");
const { pages } = require("../../constants/pages");
const { getPageInfo } = require("../../helpers/getPageInfo");
const CollectionIGPage = require("../../model/CollectionIGPage");
const MonthStatus = require("../../model/MonthStatus");

exports.updateAllPages = async (req, res) => {
  try {
    res.status(200).send("Updating Pages");

    const date = new Date();
    const currentMonthName = months[date.getMonth()];

    let currentMonthInDB = await MonthStatus.findOne(
      {
        name: currentMonthName,
      },
      {
        new: true,
      }
    );

    if (!currentMonthInDB) {
      currentMonthInDB = await MonthStatus.create({
        name: currentMonthName,
      });
    }

    console.log("Updating Pages for", currentMonthName);

    const updatedPages = await getPageInfo(pages);

    console.log("Got Pages From Apify. Updating DB.");

    const updatedPagesInDB = await Promise.all(
      updatedPages.map(async (page) => {
        const { username, followersCount } = page;

        const updatedPage = await CollectionIGPage.findOneAndUpdate(
          { username },
          {
            followersCount,
          }
        );

        return updatedPage;
      })
    );

    console.log("DB Updated");

    currentMonthInDB.status = "success";
    currentMonthInDB.statusMessage = "Updated Successfully";

    await currentMonthInDB.save();
  } catch (error) {
    console.log(error.message);

    const date = new Date();
    const currentMonthName = months[date.getMonth()];
    // Update Error Message in DB
    await MonthStatus.findOneAndUpdate(
      {
        name: currentMonthName,
      },
      {
        status: "fail",
        statusMessage: error.message,
      }
    );
  }
};
