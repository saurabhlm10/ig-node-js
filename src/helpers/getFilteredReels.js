const getFilteredReels = async (reels, usernames) => {
  const currentDate = new Date();

  // Filter out Reels from Current Month
  const currentMonth = currentDate.getMonth();

  const reelsFilteredByMonth = reels.filter((reel) => {
    const reelDate = new Date(reel.timestamp);

    return reelDate.getMonth() === currentMonth;
  });

  console.log("reelsFilteredByMonth.length", reelsFilteredByMonth.length);

  return reelsFilteredByMonth;
};

module.exports = {
  getFilteredReels,
};
