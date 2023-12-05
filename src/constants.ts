import { getDaysInCurrentMonth } from './helpers/getDaysInCurrentMonth';

export const apifyPerUsernameResultLimit = 5;
export const limit = 1;
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

const postsPerDay = 6;
const daysInCurrentMonth = getDaysInCurrentMonth();
export const postsPerMonth = 2;
// export const postsPerMonth = postsPerDay * daysInCurrentMonth;
