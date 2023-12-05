import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import IGPageModel from '../../model/IGPage';

export const createIGPage = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({
        message: 'name is required',
      });

    const page = new IGPageModel({
      name: name,
    });

    await page.save();
    res.status(201).send(page);
  } catch (error) {
    if (error instanceof MongoError) {
      // Handle duplication error
      if (error.code === 11000) {
        return res.status(400).send({ error: 'Username already exists.' });
      }
    } else if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: 'Internal Server Error.' });
    } else {
      return res.status(500).send({ error: 'An unknown error occurred.' });
    }
  }
};
