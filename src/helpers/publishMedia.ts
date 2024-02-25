import axios from "axios";
import { AxiosError } from "axios";
import { isUploadSuccessful } from "../utils/isUploadSuccessful";
import { ENV } from "../constants";

export const publishMedia = async ({
  creation_id,
  currentPostId,
  page,
}: {
  creation_id: string;
  currentPostId: string;
  page: string;
}) => {
  console.log("publishMedia");
  console.log("currentPostId", currentPostId);
  const access_token = ENV.access_token;
  const ig_user_id = process.env[`${page.toUpperCase()}_IG_USER_ID`];

  try {
    const checkStatusUri = `https://graph.facebook.com/v17.0/${creation_id}?fields=status,status_code&access_token=${access_token}`;
    const isUploaded = await isUploadSuccessful(
      0,
      checkStatusUri,
      currentPostId
    );

    console.log("isUploaded", isUploaded);

    console.log("1");

    // When uploaded successfully, publish the video
    if (isUploaded) {
      const publishVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`;
      const publishResponse = await axios.post(publishVideoUri);
      console.log("publishedid", publishResponse.data.id);
      return publishResponse.data.id;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error.response?.data));

      // Check if it is Graph API error
      if (error.response?.data?.error?.message)
        throw new Error(error.response?.data.error.message);

      throw new Error(error.response?.data);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
