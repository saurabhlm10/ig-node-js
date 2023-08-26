const axios = require("axios");
const Post = require("../model/Post");


/**
 * Setting retries with 3 seconds delay, as async video upload may take a while in the backed to return success
 * @param {*} n
 * @returns
 */
function _wait(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

async function setPublishedInvalid(
  currentPostId,
  statusMessage
) {

  const post = await Post.findById(currentPostId);
  post.status = statusMessage;
  await post.save();
}

/**
 * Retrieves container status for the uploaded video, while its uploading in the backend asynchronously
 * and checks if the upload is complete.
 * @param {*} retryCount
 * @param {*} checkStatusUri
 * @returns Promise<boolean>
 */
const isUploadSuccessful = async (
  retryCount,
  checkStatusUri,
  currentPostId
) => {
  try {
    console.log(retryCount);
    if (retryCount > 30) return false;
    const response = await axios.get(checkStatusUri);
    console.log(response.data);
    if (response.data.status_code == "PUBLISHED") {
      // Update the published status of the post and save to csv
      // setPublishedInvalid(currentPostId, "Y");
      throw new Error("Post Already Published");
    }
    // if (response.data.status_code == "ERROR") {
    //   if(retryCount < 30){

    //   }
    //   // Update the published status of the post and save to csv
    //   setPublishedInvalid(currentPostId, "Invalid");
    //   throw new Error("Error occured in publishing Post");
    // }
    if (response.data.status_code != "FINISHED") {
      await _wait(3000);
      await isUploadSuccessful(retryCount + 1, checkStatusUri, currentPostId);
    }
    return true;
  } catch (e) {
    throw e;
  }
};


module.exports = { isUploadSuccessful }