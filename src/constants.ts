import { getDaysInCurrentMonth } from "./helpers/getDaysInCurrentMonth";

// Server
const PORT = process.env.PORT || 4000;

// Apify
const APIFY_KEY = process.env.APIFY_KEY;
const apifyPerUsernameResultLimit = Number(
  process.env.APIFY_PER_USERNAME_RESULT_LIMIT
);

// MongoDB
const MONGO_URL = process.env.MONGO_URL as string;
const limit = process.env.LIMIT;

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const postsPerDay = Number(process.env.POSTS_PER_DAY as string);
const daysInCurrentMonth = getDaysInCurrentMonth();
//  const postsPerMonth = 2;
const postsPerMonth = postsPerDay * daysInCurrentMonth;

// Upstash Redis
const upstashRedisRESTUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRedisauthToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// FB
const access_token = process.env.ACCESS_TOKEN;

// Cloudinary
const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET;

export const ENV = {
  PORT,
  MONGO_URL,
  APIFY_KEY,
  apifyPerUsernameResultLimit,
  months,
  postsPerMonth,
  limit,
  upstashRedisRESTUrl,
  upstashRedisauthToken,
  access_token,
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
};
