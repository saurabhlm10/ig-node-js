import { Request, Response } from 'express';
import BatchModel from '../../model/Batch.model';
import IGPageModel from '../../model/IGPage';
import { Types } from 'mongoose';

export const addPageToBatch = async (req: Request, res: Response) => {
  try {
    const { batch } = req.params
    const { page } = req.body

    if (!batch) return res.status(400).json({ message: 'batch is required' })
    if (!page) return res.status(400).json({ message: 'page is required' })

    const batchToUpdate = await BatchModel.findOne({ name: batch })

    if (!batchToUpdate) return res.status(404).json({ message: 'Batch not found' })

    const pageToAdd = await IGPageModel.findOne({ name: page });

    if (!pageToAdd) return res.status(404).json({ message: 'Page not found' })

    // Check if the page already exists in the batch
    const pageId = new Types.ObjectId(pageToAdd._id);
    if (batchToUpdate.pages.includes(pageId)) {
      return res.status(409).json({ message: 'Page already exists in the batch' });
    }

    batchToUpdate.pages.push(pageId);
    await batchToUpdate.save()

    res.status(201).json({ message: 'Added Page Successfully', data: batchToUpdate })

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: 'Internal Server Error.' });
    } else {
      return res.status(500).send({ error: 'An unknown error occurred.' });
    }
  }

}