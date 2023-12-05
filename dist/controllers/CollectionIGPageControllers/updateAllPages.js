"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateAllCollectionPages = void 0;
const getPageInfo_1 = require("../../helpers/getPageInfo");
const CollectionIGPage_1 = __importDefault(require("../../model/CollectionIGPage"));
const MonthStatus_1 = __importStar(require("../../model/MonthStatus"));
const constants_1 = require("../../constants");
const getCurrentMonthYearName_1 = require("../../helpers/getCurrentMonthYearName");
const IGPage_1 = __importDefault(require("../../model/IGPage"));
const updateAllCollectionPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const checkPageExists = yield IGPage_1.default.findOne({ name: page });
        if (!checkPageExists)
            return res.status(400).json({ message: 'Page doesnt exist' });
        if (!page)
            return res.status(400).json({ message: 'page name is required' });
        const date = new Date();
        const currentMonthName = constants_1.months[date.getMonth()];
        const currentYearName = date.getFullYear();
        console.log(currentYearName);
        let currentMonthYearInDB = yield MonthStatus_1.default.findOne({
            page,
            name: currentMonthName,
            year: currentYearName,
        });
        console.log('1');
        if (!currentMonthYearInDB) {
            currentMonthYearInDB = yield MonthStatus_1.default.create({
                page,
                name: currentMonthName,
                year: currentYearName,
                status: MonthStatus_1.MonthStatusStatusValues.IN_PROGRESS,
                statusMessage: 'Update is in progress',
            });
        }
        console.log('currentMonthYearInDB', currentMonthYearInDB);
        const currentMonthYearName = (0, getCurrentMonthYearName_1.getCurrentMonthYearName)();
        const redisKey = page + '-' + currentMonthYearName + 'updatePages';
        const rawPages = yield CollectionIGPage_1.default.find({ page });
        console.log('rawPages', rawPages.length);
        if (!rawPages.length)
            return res
                .status(400)
                .json({ message: 'No collection pages available for' + page });
        const pages = rawPages.map((rawPage) => rawPage.username);
        res.status(200).send(`Updating pages for ${redisKey}`);
        const updatedPages = yield (0, getPageInfo_1.getPageInfo)(pages);
        console.log('Got Pages From Apify. Updating DB.');
        const updatedPagesInDB = yield Promise.all(updatedPages.map((page) => __awaiter(void 0, void 0, void 0, function* () {
            const { username, followersCount } = page;
            const updatedPage = yield CollectionIGPage_1.default.findOneAndUpdate({ username }, { followersCount }, { new: true });
            return updatedPage;
        })));
        console.log('DB Updated');
        currentMonthYearInDB.status = 'success';
        currentMonthYearInDB.statusMessage = 'Updated Pages Successfully';
        yield currentMonthYearInDB.save();
        return;
    }
    catch (error) {
        const date = new Date();
        const currentMonthName = constants_1.months[date.getMonth()];
        // Update Error Message in DB
        yield MonthStatus_1.default.findOneAndUpdate({ name: currentMonthName }, {
            status: 'fail',
            statusMessage: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.updateAllCollectionPages = updateAllCollectionPages;
