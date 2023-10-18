const upstashRedRESTUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const axios = require("axios");

exports.fetchRedis = async (command, ...args) => {
  console.log("Creating Entry In Redis");

  const commandUrl = `${upstashRedRESTUrl}/${command}/${args.join("/")}`;

  console.log("command", command);
  console.log("commandUrl", commandUrl);

  const response = await axios.get(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log("response.data", response.data);
  //   const data = response.result

  if (response.statusText !== "OK") {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  if (command === "set") return;

  if (command === "zadd") return;

//   const data = await JSON.parse(response.data.result);

//   console.log("data", data);

//   return data;
};
