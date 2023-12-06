import { Request, Response } from 'express';
import { uploadMedia } from '../../helpers/uploadMedia';
import { AxiosError } from 'axios';
import Post from '../../model/Post';
import { months } from '../../constants';

export const uploadMediaContainer = async (req: Request, res: Response) => {
  try {
    console.log('uploadMediaContainer');

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    // Find one post to upload from current month
    const currentPost = await Post.findOne({
      status: 'uploaded-to-cloud',
      publishMonth: currentMonth,
    });

    console.log(currentPost?._id);

    if (!currentPost) {
      return res.status(400).json({
        message: 'No Posts To Be Uploaded',
      });
    }

    const mediaToUpload = currentPost.media_url;

    // Upload Media, save creation_id and uploaded status to CSV
    const creation_id = await uploadMedia(
      mediaToUpload,
      currentPost.caption,
      currentPost.cover_url
    );

    if (!creation_id) {
      return res.status(400).json({
        message: 'Failed to upload media',
      });
    }

    currentPost.creation_id = creation_id;

    currentPost.status = 'uploaded-media-container';

    await currentPost.save();

    return res.status(200).json({
      message: 'Media Uploaded successfully',
      creation_id,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      return res.status(400).json(error.response?.data);
    }
    if (error instanceof Error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  }
};
