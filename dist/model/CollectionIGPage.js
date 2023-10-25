"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CollectionIGPageSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    followersCount: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
    },
}, {
    timestamps: true,
});
CollectionIGPageSchema.pre("save", function (next) {
    this.link = "https://www.instagram.com/" + this.username;
    next();
});
const CollectionIGPage = mongoose_1.default.model("CollectionIGPage", CollectionIGPageSchema);
exports.default = CollectionIGPage;
