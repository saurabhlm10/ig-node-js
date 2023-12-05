import { Request, Response } from 'express';
import { publishMedia } from '../../helpers/publishMedia';
import { AxiosError } from 'axios';
import Post from '../../model/Post';
import { months } from '../../constants';

export const publishPost = async (req: Request, res: Response) => {
  try {
    console.log('1');

    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    const currentPost = await Post.findOne({
      status: 'uploaded-media-container',
      publishMonth: currentMonth,
    });

    console.log(currentPost);

    console.log('2');

    if (!currentPost) {
      return res.status(404).json({ message: 'No Posts To Be Uploaded' });
    }

    const creation_id = currentPost.creation_id as string;

    console.log('creation_id', creation_id);

    // Publish Media, save published_id, update published status to Y in CSV
    const published_id = await publishMedia(
      creation_id,
      Number(currentPost._id)
    );

    console.log('4');

    currentPost.status = 'published';
    currentPost.published_id = published_id;

    await currentPost.save();

    console.log('5');

    return res.status(200).json({
      message: 'Post Published Successfully',
      published_id,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return res.status(400).json(error.response?.data);
    }
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
