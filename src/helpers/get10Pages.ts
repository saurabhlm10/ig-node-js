import { ENV } from "../constants";
import CollectionIGPage from "../model/CollectionIGPage";

const get10Pages = async (page: string, offset: number) => {
  try {
    const collectionPages = await CollectionIGPage.aggregate([
      { $match: { page: page } },
      { $sort: { followersCount: -1 } },
      { $skip: offset },
      { $limit: Number(ENV.limit) },
    ]);

    return collectionPages;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unexpected error occurred", error);
    }
  }
};

export { get10Pages };
