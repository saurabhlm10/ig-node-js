"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const port = process.env.PORT || 4000;
app_1.default.use((0, cors_1.default)());
app_1.default.use((0, morgan_1.default)("tiny"));
app_1.default.use("/api/post", postRoutes_1.default);
app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
