import axios from "axios";
import Post from "../model/Post";

/**
 * Setting retries with 3 seconds delay, as async video upload may take a while in the backend to return success
 * @param {*} n
 * @returns
 */
function _wait(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

async function setStatus(currentPostId: string, statusMessage: string) {
  console.log("currentPostId", currentPostId);
  console.log("setStatus");

  const post = await Post.findById(currentPostId);
  let errorMessage = "";

  console.log("post", post);

  if (!post) {
    throw new Error("Post does not exist");
  }

  switch (statusMessage) {
    case "PUBLISHED":
      post.status = "published";
      errorMessage = "Post is already published";
      break;
    case "EXPIRED":
      post.status = "uploaded-to-cloud";
      errorMessage = "Media container has expired";
      break;
    case "ERROR":
      post.status = "error";
      errorMessage = "An error occured while checking media container";
      break;
    default:
      throw new Error("Invalid status message");
  }

  await post.save();

  console.log("errorMessage", errorMessage);

  throw new Error(errorMessage);
}

/**
 * Retrieves container status for the uploaded video, while it's uploading in the backend asynchronously
 * and checks if the upload is complete.
 * @param {*} retryCount
 * @param {*} checkStatusUri
 * @returns Promise<boolean>
 */
export const isUploadSuccessful = async (
  retryCount: number,
  checkStatusUri: string,
  currentPostId: string
): Promise<boolean> => {
  try {
    console.log(retryCount);
    if (retryCount > 30) return false;
    const response = await axios.get(checkStatusUri);
    console.log(response.data);
    if (
      response.data.status_code === "PUBLISHED" ||
      response.data.status_code === "EXPIRED"
    ) {
      // Update the published status of the post and save to DB
      console.log("currentPostId inside isUploadSuccessful", currentPostId);
      await setStatus(currentPostId, response.data.status_code);
      return true;
    }
    if (response.data.status_code === "ERROR") {
      await setStatus(currentPostId, response.data.status_code);
      throw new Error("Error" + response.data.status);
    }
    if (response.data.status_code !== "FINISHED") {
      await _wait(3000);
      return isUploadSuccessful(retryCount + 1, checkStatusUri, currentPostId);
    }
    return true;
  } catch (e) {
    throw e;
  }
};
