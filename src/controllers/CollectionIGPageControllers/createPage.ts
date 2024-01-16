import { Request, Response } from 'express';
import CollectionIGPage from '../../model/CollectionIGPage';
import { MongoError } from 'mongodb';

export const createPage = async (req: Request, res: Response) => {
  const { username, followersCount, page } = req.body;

  console.log(req.body)

  // Check if all required fields are provided
  if (!username || typeof followersCount !== 'number') {
    return res
      .status(400)
      .send({ error: 'Both username and followersCount are required.' });
  }

  try {
    // Create a new page
    const createdPage = new CollectionIGPage({
      username: username,
      followersCount: followersCount,
      page: page
    });

    await createdPage.save();
    res.status(201).send(createdPage);
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
