import axios, { AxiosError } from "axios";

export const uploadMedia = async (image_url: string, caption: string) => {
  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;
  const post_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS`;

  console.log(image_url)

  const payload = {
    video_url: image_url,
    caption,
    access_token: access_token,
  };

  // try {
  //   const r = await axios.post(post_url, payload);

  //   return r.data.id;
  // }

  const coverUrl = ''
  const thumbOffset = ''
  const locationId = ''
  const uploadParamsString = `caption=${caption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
  const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${image_url}&${uploadParamsString}`;

  

  try {

    const uploadResponse = await axios.post(uploadVideoUri);

    console.log(uploadResponse.data);

    return uploadResponse.data.id

  } catch (error) {
    // console.log(error);
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
