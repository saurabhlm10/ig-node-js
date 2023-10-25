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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageInfo = void 0;
const apify_client_1 = require("apify-client");
const process_1 = __importDefault(require("process"));
// Initialize the ApifyClient with API token
const client = new apify_client_1.ApifyClient({
    token: process_1.default.env.APIFY_KEY,
});
const getPageInfo = (pageUsernames) => __awaiter(void 0, void 0, void 0, function* () {
    // Prepare Actor input
    console.log("Getting Pages From Apify");
    const input = {
        usernames: pageUsernames,
    };
    const results = [];
    try {
        // Run the Actor and wait for it to finish
        const run = yield client.actor("dSCLg0C3YEZ83HzYX").call(input);
        // Fetch and print Actor results from the run's dataset (if any)
        console.log("Results from dataset");
        const { items } = yield client.dataset(run.defaultDatasetId).listItems();
        items.forEach((item) => {
            results.push({
                username: item.username,
                followersCount: item.followersCount,
            });
        });
        return results;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getPageInfo = getPageInfo;
