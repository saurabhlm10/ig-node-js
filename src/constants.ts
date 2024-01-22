import { getDaysInCurrentMonth } from './helpers/getDaysInCurrentMonth';

export const apifyPerUsernameResultLimit = Number(process.env.APIFY_PER_USERNAME_RESULT_LIMIT);
export const limit = process.env.LIMIT;
export const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const postsPerDay = Number(process.env.POSTS_PER_DAY as string);
const daysInCurrentMonth = getDaysInCurrentMonth();
export const postsPerMonth = 2;
// export const postsPerMonth = postsPerDay * daysInCurrentMonth;
