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
const fetchRedis_js_1 = require("../../helpers/fetchRedis.js");
const months_js_1 = require("../../constants/months.js");
const getReelsFromApify_js_1 = require("../../helpers/getReelsFromApify.js");
const postsPerDay_js_1 = require("../../constants/postsPerDay.js");
const getFilteredReels_js_1 = require("../../helpers/getFilteredReels.js");
const uploadReelToDB_js_1 = require("../../helpers/uploadReelToDB.js");
const get10Pages_js_1 = require("../../helpers/get10Pages.js");
const dbquery_js_1 = require("../../constants/dbquery.js");
const collectPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = "frenchiesforthewin";
        const mediaType = "reels";
        // Object for maintaining state in Redis
        let redisEntry = {
            postOffset: 0,
            pageOffset: 0,
        };
        console.log("Getting Month-Year");
        // Get current Month Name
        const currentDate = new Date();
        const currentMonthYearName = `${months_js_1.months[currentDate.getMonth()]}-${currentDate.getFullYear()}`;
        const redisKey = page + "-" + currentMonthYearName + "-" + mediaType;
        console.log("Checking If Current State In Redis");
        // Get Current State from Redis
        const rawResponse = yield (0, fetchRedis_js_1.fetchRedis)("get", redisKey);
        console.log("rawResponse", rawResponse);
        if (!rawResponse) {
            // Create entry in Redis
            console.log("Creating Entry In Redis");
            yield (0, fetchRedis_js_1.fetchRedis)("set", redisKey, JSON.stringify(redisEntry));
        }
        else {
            console.log("Got Entry From Redis");
            redisEntry.postOffset = rawResponse.postOffset;
            redisEntry.pageOffset = rawResponse.pageOffset;
        }
        while (redisEntry.postOffset < postsPerDay_js_1.postsPerMonth) {
            // Get 10 DB entries sorted in descending order
            const collectionPages = yield (0, get10Pages_js_1.get10Pages)(redisEntry.pageOffset);
            const usernames = collectionPages.map((page) => {
                return page.username;
            });
            // Get Reels from Apify
            const reels = yield (0, getReelsFromApify_js_1.getReelsFromApify)(usernames);
            // Filter out the reels by the criteria
            const filteredReels = yield (0, getFilteredReels_js_1.getFilteredReels)(reels);
            filteredReels.forEach((reel) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, uploadReelToDB_js_1.uploadReelToDB)(reel, page); }));
            redisEntry.postOffset = redisEntry.postOffset + filteredReels.length;
            redisEntry.pageOffset = redisEntry.pageOffset + dbquery_js_1.limit;
            yield (0, fetchRedis_js_1.fetchRedis)("set", redisKey, JSON.stringify(redisEntry));
        }
        return res.status(200).send(redisEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.status(500).send(error.message);
        }
        else {
            console.log('An unexpected error occurred', error);
        }
    }
});
exports.collectPosts = collectPosts;
