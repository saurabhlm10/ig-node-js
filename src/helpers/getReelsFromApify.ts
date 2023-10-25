import { ApifyClient } from "apify-client";
import { apifyPerUsernameResultLimit } from "../constants/apify.js";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_KEY,
});

export const getReelsFromApify = async (usernames: string[]) => {
  // Prepare Actor input
  const input = {
    username: usernames,
    resultsLimit: apifyPerUsernameResultLimit,
  };

  // Run the Actor and wait for it to finish
  const run = await client.actor("xMc5Ga1oCONPmWJIa").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  return items;
};
