import { Request, Response } from 'express';
import { getPageInfo } from '../../helpers/getPageInfo';
import CollectionIGPage from '../../model/CollectionIGPage';
import MonthStatus, { MonthStatusStatusValues } from '../../model/MonthStatus';
import { months } from '../../constants';
import { getCurrentMonthYearName } from '../../helpers/getCurrentMonthYearName';
import IGPageModel from '../../model/IGPage';
import { StatusValues } from '../../types/RedisEntry.type';

export const updateAllCollectionPages = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    const checkPageExists = await IGPageModel.findOne({ name: page });

    if (!checkPageExists)
      return res.status(400).json({ message: 'Page doesnt exist' });

    if (!page)
      return res.status(400).json({ message: 'page name is required' });

    const date = new Date();
    const currentMonthName = months[date.getMonth()];
    const currentYearName = date.getFullYear();

    console.log(currentYearName);

    let currentMonthYearInDB = await MonthStatus.findOne({
      page,
      name: currentMonthName,
      year: currentYearName,
    });

    console.log('1');

    if (!currentMonthYearInDB) {
      currentMonthYearInDB = await MonthStatus.create({
        page,
        name: currentMonthName,
        year: currentYearName,
        status: MonthStatusStatusValues.IN_PROGRESS,
        statusMessage: 'Update is in progress',
      });
    }

    console.log('currentMonthYearInDB', currentMonthYearInDB);

    const currentMonthYearName = getCurrentMonthYearName();

    const redisKey = page + '-' + currentMonthYearName + 'updatePages';

    const rawPages = await CollectionIGPage.find({ page });

    console.log('rawPages', rawPages.length);

    if (!rawPages.length)
      return res
        .status(400)
        .json({ message: 'No collection pages available for' + page });

    const pages = rawPages.map((rawPage) => rawPage.username);

    res.status(200).send(`Updating pages for ${redisKey}`);

    const updatedPages = await getPageInfo(pages);
    console.log('Got Pages From Apify. Updating DB.');

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

    console.log('DB Updated');

    currentMonthYearInDB.status = 'success';
    currentMonthYearInDB.statusMessage = 'Updated Pages Successfully';
    await currentMonthYearInDB.save();

    return;
  } catch (error) {
    const date = new Date();
    const currentMonthName = months[date.getMonth()];

    // Update Error Message in DB
    await MonthStatus.findOneAndUpdate(
      { name: currentMonthName },
      {
        status: 'fail',
        statusMessage: error instanceof Error ? error.message : 'Unknown error',
      }
    );
  }
};
