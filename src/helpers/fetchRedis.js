const upstashRedRESTUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const axios = require("axios");

exports.fetchRedis = async (command, ...args) => {
  console.log("Creating Entry In Redis");

  const commandUrl = `${upstashRedRESTUrl}/${command}/${args.join("/")}`;

  const response = await axios.get(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.statusText !== "OK") {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  console.log(command);

  if (command === "get") {
    console.log("GET COMMAND");

    if (response.data.result) {
      // const data = await JSON.parse(response.data.result);
      const jsonString = response.data.result.replace(/(\w+):/g, '"$1":');

      // Step 2: Parse the modified string
      const data = JSON.parse(jsonString);

      return data;
    } else {
      return null;
    }
  }

  if (command === "set") return;

  if (command === "zadd") return;
};
