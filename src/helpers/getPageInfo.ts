import { ApifyClient } from "apify-client";
import process from "process";
import { ENV } from "../constants";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: ENV.APIFY_KEY,
});

export const getPageInfo = async (pageUsernames: string[]) => {
  // Prepare Actor input
  console.log("Getting Pages From Apify");
  const input = {
    usernames: pageUsernames,
  };

  const results: InstagramPage[] = [];

  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("dSCLg0C3YEZ83HzYX").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log("Results from dataset");
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    items.forEach((item: any) => {
      results.push({
        username: item.username,
        followersCount: item.followersCount,
      });
    });

    return results;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
