"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectPosts = void 0;
const fetchRedis_1 = require("../../helpers/fetchRedis");
const getReelsFromApify_1 = require("../../helpers/getReelsFromApify");
const postsPerDay_1 = require("../../constants/postsPerDay");
const getFilteredReels_1 = require("../../helpers/getFilteredReels");
const uploadReelToDB_1 = require("../../helpers/uploadReelToDB");
const get10Pages_1 = require("../../helpers/get10Pages");
const dbquery_1 = require("../../constants/dbquery");
const getCurrentMonthYearName_1 = require("../../helpers/getCurrentMonthYearName");
const RedisEntry_type_1 = require("../../types/RedisEntry.type");
const collectPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = 'frenchiesforthewin';
    const mediaType = 'reels';
    console.log('Getting Month-Year');
    // Get current Month Name
    const currentMonthYearName = (0, getCurrentMonthYearName_1.getCurrentMonthYearName)();
    const redisKey = page + '-' + currentMonthYearName + '-' + mediaType;
    // Object for maintaining state in Redis
    let redisEntry = {
        postOffset: 0,
        pageOffset: 0,
        status: RedisEntry_type_1.StatusValues.IN_PROGRESS,
        statusMessage: `Collecting posts for` + redisKey,
    };
    console.log('Checking If Current State In Redis');
    try {
        // Get Current State from Redis
        const rawResponse = yield (0, fetchRedis_1.fetchRedis)('get', redisKey);
        console.log('rawResponse', rawResponse);
        if (!rawResponse) {
            // Create entry in Redis
            console.log('Creating Entry In Redis');
            yield (0, fetchRedis_1.fetchRedis)('set', redisKey, JSON.stringify(redisEntry));
        }
        else {
            console.log('Got Entry From Redis');
            redisEntry.postOffset = rawResponse.postOffset;
            redisEntry.pageOffset = rawResponse.pageOffset;
        }
        res.status(200).send(`Collecting posts for ${redisKey}`);
        console.log('PASSEDJNCJKSNCKNSCJN');
        while (redisEntry.postOffset < postsPerDay_1.postsPerMonth) {
            // Get 10 DB entries sorted in descending order
            const collectionPages = yield (0, get10Pages_1.get10Pages)(redisEntry.pageOffset);
            console.log('collectionPages', collectionPages);
            const usernames = collectionPages.map((page) => {
                return page.username;
            });
            // Get Reels from Apify
            const reels = yield (0, getReelsFromApify_1.getReelsFromApify)(usernames);
            console.log('reels');
            // Filter out the reels by the criteria
            const filteredReels = yield (0, getFilteredReels_1.getFilteredReels)(reels);
            filteredReels.forEach((reel) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, uploadReelToDB_1.uploadReelToDB)(reel, page); }));
            redisEntry.postOffset = redisEntry.postOffset + filteredReels.length;
            redisEntry.pageOffset = redisEntry.pageOffset + dbquery_1.limit;
            redisEntry.status = RedisEntry_type_1.StatusValues.SUCCESS;
            redisEntry.statusMessage = 'Collected Posts Successfully for ' + redisKey;
            yield (0, fetchRedis_1.fetchRedis)('set', redisKey, JSON.stringify(redisEntry));
        }
        console.log('Collected Posts Successfully');
        return;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            redisEntry.status = RedisEntry_type_1.StatusValues.ERROR;
            redisEntry.statusMessage = error.message;
            yield (0, fetchRedis_1.fetchRedis)('set', redisKey, JSON.stringify(redisEntry));
        }
        else {
            console.log('An unexpected error occurred', error);
        }
    }
});
exports.collectPosts = collectPosts;
