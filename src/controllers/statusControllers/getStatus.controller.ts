import { Request, Response } from 'express';
import { getCurrentMonthYearName } from '../../helpers/getCurrentMonthYearName';
import { fetchRedis } from '../../helpers/fetchRedis';

export const getStatus = async (req: Request, res: Response) => {
  try {
    const { page, mediaType } = req.query;

    if (!page || !mediaType) {
      return res.status(400).json({
        message: 'page and mediaType is required',
      });
    }

    const currentMonthYearName = getCurrentMonthYearName();

    const redisKey = page + '-' + currentMonthYearName + '-' + mediaType;

    const rawResponse = await fetchRedis('get', redisKey);

    console.log(rawResponse);

    return res.status(200).json({
      status: rawResponse.status,
      statusMessage: rawResponse.statusMessage,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: 'Internal Server Error.' });
    } else {
      return res.status(500).send({ error: 'An unknown error occurred.' });
    }
  }
};
