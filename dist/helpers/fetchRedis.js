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
exports.fetchRedis = void 0;
const axios_1 = __importDefault(require("axios"));
const upstashRedRESTUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const fetchRedis = (command, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const commandUrl = `${upstashRedRESTUrl}/${command}/${args.join('/')}`;
    const response = yield axios_1.default.get(commandUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (response.statusText !== 'OK') {
        throw new Error(`Error executing Redis command: ${response.statusText}`);
    }
    if (command === 'get') {
        if (response.data.result) {
            const jsonString = response.data.result.replace(/(\w+):/g, '"$1":');
            const data = JSON.parse(jsonString);
            return data;
        }
        else {
            return null;
        }
    }
    if (command === 'set' || command === 'zadd')
        return;
});
exports.fetchRedis = fetchRedis;
