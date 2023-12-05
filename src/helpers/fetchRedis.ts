import axios from 'axios';

const upstashRedRESTUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export const fetchRedis = async (command: string, ...args: string[]) => {
  const commandUrl = `${upstashRedRESTUrl}/${command}/${args.join('/')}`;

  const response = await axios.get(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.statusText !== 'OK') {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  if (command === 'get') {
    if (response.data.result) {
      const jsonString = response.data.result.replace(/(\w+):/g, '"$1":');
      const data = JSON.parse(jsonString);
      return data;
    } else {
      return null;
    }
  }

  if (command === 'set' || command === 'zadd') return;
};