const axios = require("axios");
const { AxiosError } = require("axios");
const { isUploadSuccessful } = require("../utils/isUploadSuccessful");


exports.publishMedia = async (
  creation_id,
  currentPostId
) => {
  console.log("publishMedia");
  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;

  try {
    const checkStatusUri = `https://graph.facebook.com/v17.0/${creation_id}?fields=status,status_code&access_token=${access_token}`;
    const isUploaded = await isUploadSuccessful(
      0,
      checkStatusUri,
      currentPostId
    );

    console.log("1");

    // When uploaded successfully, publish the video
    if (isUploaded) {
      const publishVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`;
      const publishResponse = await axios.post(publishVideoUri);

      return publishResponse.data.id;
    }
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
