"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
// import Logger from "phyrlogs";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3300;
const auth_1 = __importDefault(require("./src/routes/auth"));
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use("/auth", auth_1.default);
app.use("/", (req, res) => {
    // let logger = new Logger("a", "b");
    // logger.s
    res.send({
        status: 200,
        message: "Success",
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
