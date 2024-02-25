import { Request, Response } from "express";
import { getCurrentMonthYearName } from "../../helpers/getCurrentMonthYearName";
import { fetchRedis } from "../../helpers/fetchRedis";
import { ENV } from "../../constants";
import MonthStatus from "../../model/MonthStatus";

export const getUpdatePageStatus = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({
        message: "page is required",
      });
    }
    const date = new Date();

    const currentMonthName = ENV.months[date.getMonth()];
    const currentYearName = date.getFullYear();

    const currentMonthYearName = getCurrentMonthYearName();

    let currentMonthYearInDB = await MonthStatus.findOne({
      page: page,
      name: currentMonthName,
      year: currentYearName,
    });

    if (!currentMonthYearInDB)
      return res.status(400).json({
        message: `Could not find ${page} ${currentMonthName} ${currentYearName}`,
      });

    return res.status(200).json({
      status: currentMonthYearInDB?.status,
      statusMessage: currentMonthYearInDB?.statusMessage,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: "Internal Server Error." });
    } else {
      return res.status(500).send({ error: "An unknown error occurred." });
    }
  }
};
