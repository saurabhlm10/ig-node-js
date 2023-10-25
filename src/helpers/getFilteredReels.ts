const getFilteredReels = async (reels: any) => {
  const currentDate = new Date();

  // Filter out Reels from Current Month
  const currentMonth = currentDate.getMonth();

  const reelsFilteredByMonth = reels.filter((reel: InstagramPost) => {
    const reelDate = new Date(reel.timestamp);

    return reelDate.getMonth() === currentMonth;
  });

  console.log("reelsFilteredByMonth.length", reelsFilteredByMonth.length);

  return reelsFilteredByMonth;
};

export {
  getFilteredReels,
};
