import axios, { AxiosError } from "axios";
import { isUploadSuccessful } from "../utils/isUploadSuccessful";

export const publishMedia = async (creation_id: string) => {
  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;

  const publish_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish`;
  const publish_payload = {
    creation_id,
    access_token,
  };

  // try {
  //   const r = await axios.post(publish_url, publish_payload);

  //   return r.data.id;
  // }

  const checkStatusUri = `https://graph.facebook.com/v17.0/${creation_id}?fields=status_code&access_token=${access_token}`;
  const isUploaded = await isUploadSuccessful(0, checkStatusUri);

  // When uploaded successfully, publish the video

  
  try {
    if (isUploaded) {
      const publishVideoUri = `https://graph.facebook.com/v1.0/${ig_user_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`;
      const publishResponse = await axios.post(publishVideoUri);

      console.log(publishResponse.data);

      return publishResponse.data.id;
    }
  } catch (error) {
    // console.log(error)
    if(error instanceof AxiosError){
      console.log(error.response?.data)
    }
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
