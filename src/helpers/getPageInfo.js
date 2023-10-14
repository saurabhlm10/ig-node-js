const { ApifyClient } = require("apify-client");

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_KEY,
});

const getPageInfo = async (pageUsernames) => {
  // Prepare Actor input

  const input = {
    usernames: pageUsernames,
  };

  const results = [];

  // Run the Actor and wait for it to finish
  const run = await client.actor("dSCLg0C3YEZ83HzYX").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  items.forEach((item) => {
    results.push({
      username: item.username,
      followersCount: item.followersCount,
    });
  });

  return results;
};

module.exports = {
  getPageInfo,
};
