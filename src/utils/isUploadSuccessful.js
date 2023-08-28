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

async function setStatus(
  currentPostId,
  statusMessage
) {
  const post = await Post.findById(currentPostId);

  switch (statusMessage) {
    case "PUBLISHED": post.status = 'published';
    case "EXPIRED": post.status = 'uploaded-to-cloud'
    case "ERROR": post.status = 'error';
  }

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
    if (response.data.status_code == "PUBLISHED" || response.data.status_code == "EXPIRED" || response.data.status_code == "ERROR") {
      // Update the published status of the post and save to DB
      await setStatus(currentPostId, response.data.status_code);
      return
    }
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