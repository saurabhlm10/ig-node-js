import { Request, Response } from 'express';
import { fetchRedis } from '../../helpers/fetchRedis';
import { AxiosError } from 'axios';

export const clearCache = async (req: Request, res: Response) => {
  try {
    const { key } = req.query
    if (!key) return res.status(400).json({ message: 'key is required' })
    const response = await fetchRedis('del', String(key))

    console.log(response)

    if (response) {
      return res.status(200).json({ message: `deleted key ${key}` })
    }
    throw new Error('key not found')



  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data.message);
    }
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).send({ error: 'Internal Server Error.', message: error.message });
    } else {
      return res.status(500).send({ error: 'An unknown error occurred.' });
    }
  }

}