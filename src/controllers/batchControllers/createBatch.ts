import { Request, Response } from 'express';
import BatchModel from '../../model/Batch.model';

export const createBatch = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) return res.status(400).json({ message: 'name is required' })

    const createdBatch = await BatchModel.create({ name })

    res.status(201).json({ message: 'Batch created successfully', data: createdBatch })

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: 'Internal Server Error.' });
    } else {
      return res.status(500).send({ error: 'An unknown error occurred.' });
    }
  }

}