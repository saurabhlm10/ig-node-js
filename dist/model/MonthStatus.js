"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthStatusStatusValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
var MonthStatusStatusValues;
(function (MonthStatusStatusValues) {
    MonthStatusStatusValues["NOT_UPDATED"] = "not-updated";
    MonthStatusStatusValues["SUCCESS"] = "success";
    MonthStatusStatusValues["FAIL"] = "fail";
    MonthStatusStatusValues["IN_PROGRESS"] = "in-progress";
})(MonthStatusStatusValues || (exports.MonthStatusStatusValues = MonthStatusStatusValues = {}));
const monthStatusSchema = new mongoose_1.default.Schema({
    page: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        enum: constants_1.months,
        unique: true,
    },
    year: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: MonthStatusStatusValues,
        default: MonthStatusStatusValues.NOT_UPDATED,
    },
    statusMessage: {
        type: String,
        required: true,
        default: 'Not Updated Yet',
    },
}, {
    timestamps: true,
});
const MonthStatus = mongoose_1.default.model('MonthStatus', monthStatusSchema);
exports.default = MonthStatus;
