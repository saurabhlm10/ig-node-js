import { months } from '../constants';

export const getCurrentMonthYearName = (): string => {
  const currentDate = new Date();
  const currentMonthYearName = `${
    months[currentDate.getMonth()]
  }-${currentDate.getFullYear()}`;

  return currentMonthYearName;
};
