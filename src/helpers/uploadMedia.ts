import axios, { AxiosError } from "axios";

export const uploadMedia = async (image_url: string, caption: string) => {
  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;
  const post_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media`;

  const payload = {
    image_url: image_url,
    caption,
    access_token: access_token,
  };

  try {
    const r = await axios.post(post_url, payload);

    return r.data.id;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
