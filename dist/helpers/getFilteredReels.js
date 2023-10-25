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
exports.getFilteredReels = void 0;
const getFilteredReels = (reels) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    // Filter out Reels from Current Month
    const currentMonth = currentDate.getMonth();
    const reelsFilteredByMonth = reels.filter((reel) => {
        const reelDate = new Date(reel.timestamp);
        return reelDate.getMonth() === currentMonth;
    });
    console.log("reelsFilteredByMonth.length", reelsFilteredByMonth.length);
    return reelsFilteredByMonth;
});
exports.getFilteredReels = getFilteredReels;
