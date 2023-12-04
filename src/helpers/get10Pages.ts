import CollectionIGPage from '../model/CollectionIGPage';
import { limit } from '../constants/dbquery';

const get10Pages = async (offset: number) => {
  try {
    const collectionPages = await CollectionIGPage.aggregate([
      { $sort: { followersCount: -1 } },
      { $skip: offset },
      { $limit: limit },
    ]);

    return collectionPages;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unexpected error occurred', error);
    }
  }
};

export { get10Pages };
