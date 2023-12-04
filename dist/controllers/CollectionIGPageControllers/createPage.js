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
exports.createPage = void 0;
const CollectionIGPage_1 = __importDefault(require("../../model/CollectionIGPage"));
const mongodb_1 = require("mongodb");
const createPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, followersCount } = req.body;
    // Check if all required fields are provided
    if (!username || typeof followersCount !== 'number') {
        return res
            .status(400)
            .send({ error: 'Both username and followersCount are required.' });
    }
    try {
        // Create a new page
        const page = new CollectionIGPage_1.default({
            username: username,
            followersCount: followersCount,
        });
        yield page.save();
        res.status(201).send(page);
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoError) {
            // Handle duplication error
            if (error.code === 11000) {
                return res.status(400).send({ error: 'Username already exists.' });
            }
        }
        else if (error instanceof Error) {
            console.log(error.message);
            return res.status(500).send({ error: 'Internal Server Error.' });
        }
        else {
            return res.status(500).send({ error: 'An unknown error occurred.' });
        }
    }
});
exports.createPage = createPage;
