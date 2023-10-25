"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const months_js_1 = require("../constants/months.js");
const monthStatusSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        enum: months_js_1.months,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["not-updated", "success", "fail"],
        default: "not-updated",
    },
    statusMessage: {
        type: String,
        required: true,
        default: "Not Updated Yet",
    },
}, {
    timestamps: true,
});
const MonthStatus = mongoose_1.default.model("MonthStatus", monthStatusSchema);
exports.default = MonthStatus;
