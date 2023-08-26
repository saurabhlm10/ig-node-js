const axios = require("axios");
const { AxiosError } = require("axios");

exports.uploadMedia = async (
  media_url,
  caption,
  res
) => {
  console.log("uploadMedia");

  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;
  console.log(access_token);

  console.log(media_url);

  const payload = {
    video_url: media_url,
    caption,
    access_token: access_token,
  };

  console.log(payload);

  // try {
  //   const r = await axios.post(post_url, payload);

  //   return r.data.id;
  // }

  const coverUrl = "";
  const thumbOffset = "";
  const locationId = "";
  const uploadParamsString = `caption=${caption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
  const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${media_url}&${uploadParamsString}`;

  try {
    const uploadResponse = await axios.post(uploadVideoUri);

    return uploadResponse.data.id;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error.response?.data));

      throw new Error(error.response?.data);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
