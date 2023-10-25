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
exports.updateAllPages = void 0;
const months_1 = require("../../constants/months");
const pages_1 = require("../../constants/pages");
const getPageInfo_1 = require("../../helpers/getPageInfo");
const CollectionIGPage_1 = __importDefault(require("../../model/CollectionIGPage"));
const MonthStatus_1 = __importDefault(require("../../model/MonthStatus"));
const updateAllPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const currentMonthName = months_1.months[date.getMonth()];
        let currentMonthInDB = yield MonthStatus_1.default.findOne({ name: currentMonthName });
        if (!currentMonthInDB) {
            currentMonthInDB = yield MonthStatus_1.default.create({ name: currentMonthName });
        }
        console.log("Updating Pages for ", currentMonthName);
        const updatedPages = yield (0, getPageInfo_1.getPageInfo)(pages_1.pages);
        console.log("Got Pages From Apify. Updating DB.");
        const updatedPagesInDB = yield Promise.all(updatedPages.map((page) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, followersCount } = page;
            const updatedPage = yield CollectionIGPage_1.default.findOneAndUpdate({ username }, { followersCount }, { new: true });
            return updatedPage;
        })));
        console.log("DB Updated");
        currentMonthInDB.status = "success";
        currentMonthInDB.statusMessage = "Updated Successfully";
        yield currentMonthInDB.save();
        res.status(200).send('DB Updated');
    }
    catch (error) {
        console.error("Error updating pages:", error);
        const date = new Date();
        const currentMonthName = months_1.months[date.getMonth()];
        // Update Error Message in DB
        yield MonthStatus_1.default.findOneAndUpdate({ name: currentMonthName }, {
            status: "fail",
            statusMessage: error instanceof Error ? error.message : "Unknown error",
        });
        res.status(500).send('An error occurred while updating the pages');
    }
});
exports.updateAllPages = updateAllPages;
