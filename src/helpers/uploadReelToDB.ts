import { months } from '../constants';
import TempPost from '../model/TempPost';
import { uploadToCloud } from './uploadToCloud';

async function uploadReelToDB(reel: InstagramPost, page: string) {
  const currentDate = new Date();
  const currentMonthName = months[currentDate.getMonth()];

  try {
    // Upload video to cloudinary
    // const media_url = await uploadToCloud(reel.videoUrl);

    // console.log(reel)

    const [media_url, cover_url] = await Promise.all([
      uploadToCloud(reel.videoUrl),
      uploadToCloud(reel.displayUrl),
    ]);

    console.log('cover_url',cover_url)

    const mediaType = 'reel';

    // Add Post to Mongo
    const post = {
      source_reel_url: reel.url,
      video_url: reel.videoUrl,
      media_url: media_url,
      mediaType: mediaType,
      cover_url: cover_url,
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
