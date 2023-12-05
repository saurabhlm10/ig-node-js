import { months } from '../constants';
import TempPost from '../model/TempPost';
import { uploadToCloud } from './uploadToCloud';

async function uploadReelToDB(reel: InstagramPost, page: string) {
  const currentDate = new Date();
  const currentMonthName = months[currentDate.getMonth()];

  try {
    // Upload video to cloudinary
    const media_url = await uploadToCloud(reel.videoUrl);

    const mediaType = 'reel';

    // Add Post to Mongo
    const post = {
      source_reel_url: reel.url,
      video_url: reel.videoUrl,
      media_url: media_url,
      mediaType: mediaType,
      page: page,
      publishMonth: currentMonthName,
      caption: reel.caption,
    };

    await TempPost.create(post);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unexpected error occurred', error);
    }
  }
}

export { uploadReelToDB };
