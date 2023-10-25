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

async function setStatus(currentPostId: number, statusMessage: string) {
  const post = await Post.findById(currentPostId);

  if(!post){
    throw new Error('Post does not exist')
  }

  switch (statusMessage) {
    case "PUBLISHED":
      post.status = "published";
      break;
    case "EXPIRED":
      post.status = "uploaded-to-cloud";
      break;
    case "ERROR":
      post.status = "error";
      break;
    default:
      throw new Error("Invalid status message");
  }

  await post.save();
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
  currentPostId: number
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
      await setStatus(currentPostId, response.data.status_code);
      return true;
    }
    if (response.data.status_code === "ERROR") {
      await setStatus(currentPostId, response.data.status_code);
      throw new Error("Error" + response.data.status);
    }
    if (response.data.status_code !== "FINISHED") {
      await _wait(3000);
      return isUploadSuccessful(
        retryCount + 1,
        checkStatusUri,
        currentPostId
      );
    }
    return false;
  } catch (e) {
    throw e;
  }
};
