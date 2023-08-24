import axios from "axios";
import path from "path";
import fs from "fs";
import csv from "csvtojson";
import { Parser } from "json2csv";
import { csvFields } from "../constants/CSVFields";

/**
 * Setting retries with 3 seconds delay, as async video upload may take a while in the backed to return success
 * @param {*} n
 * @returns
 */
function _wait(n: number) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

/**
 * Retrieves container status for the uploaded video, while its uploading in the backend asynchronously
 * and checks if the upload is complete.
 * @param {*} retryCount
 * @param {*} checkStatusUri
 * @returns Promise<boolean>
 */
export const isUploadSuccessful = async (
  retryCount: number,
  checkStatusUri: string,
  currentPostId: number
) => {
  try {
    console.log(retryCount);
    if (retryCount > 30) return false;
    const response = await axios.get(checkStatusUri);
    console.log(response.data);
    if (response.data.status_code == "PUBLISHED") {
      // Update the published status of the post and save to csv
      const csvFilePath = path.join(process.cwd(), "/src/files", "Example.csv");

      console.log(csvFilePath)

      const posts: PostFromCSV[] = await csv().fromFile(csvFilePath);

      posts[currentPostId].published = "Y";
      // posts[currentPostId].published_id = published_id;

      const postsInCsv2 = new Parser({
        fields: csvFields,
      }).parse(posts);
      fs.writeFileSync(csvFilePath, postsInCsv2);

      throw new Error("Post Already Published");
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
