import axios from "axios";

export const publishMedia = async (creation_id: string) => {
  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;

  const publish_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish`;
  const publish_payload = {
    creation_id,
    access_token,
  };

  try {
    const r = await axios.post(publish_url, publish_payload);

    return r.data.id;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
