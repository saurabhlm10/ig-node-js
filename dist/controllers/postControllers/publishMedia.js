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
exports.publishMedia = void 0;
const publishMedia = (creation_id) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const ig_user_id = process.env.NEXT_PUBLIC_IG_USER_ID;
    const publish_url = `https://graph.facebook.com/v17.0/${ig_user_id}/media_publish`;
    const publish_payload = {
        creation_id,
        access_token,
    };
    try {
        const r = yield fetch(publish_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(publish_payload),
            cache: "no-store",
        });
        const data = yield r.json();
        console.log(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
exports.publishMedia = publishMedia;
