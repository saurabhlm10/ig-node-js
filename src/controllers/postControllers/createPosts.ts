import { Request, Response } from 'express';
import Post from '../../model/Post';
import TempPost from '../../model/TempPost';
import { months } from '../../constants';

export const createPosts = async (req: Request, res: Response) => {
  try {
    const page = 'frenchiesforthewin';

    if (!page) {
      return res.status(400).send('Page name is required');
    }

    // Get Current Month
    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    // Get all TempPosts for one page for current month with status "not-processed"
    const tempPosts = await TempPost.find({
      status: 'not-processed',
      publishMonth: currentMonth,
      page: page,
    });

    if (tempPosts.length === 0) {
      return res.status(400).send('No posts to process');
    }

    // Prepare array for insertMany
    const postsToInsert = tempPosts.map((tempPost) => ({
      source_reel_url: tempPost.source_reel_url,
      video_url: tempPost.video_url,
      media_url: tempPost.media_url,
      status: 'uploaded-to-cloud',
      page: tempPost.page,
      publishMonth: tempPost.publishMonth,
      caption: tempPost.caption,
      mediaType: tempPost.mediaType,
    }));

    try {
      const newPosts = await Post.insertMany(postsToInsert);
      console.log(newPosts);

      // Update all tempPosts status to "processed"
      for (let tempPost of tempPosts) {
        tempPost.status = 'processed';
        await tempPost.save();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unexpected error occurred', error);
      }
    }

    return res.status(200).send('All posts processed');
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
  }
};
