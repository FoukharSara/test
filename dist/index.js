"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, fastify_1.default)({ logger: true });
//connect to mongoose
mongoose_1.default.connect('mongodb://127.0.0.1:27017/crud')
    .then(() => {
    app.log.info("Connected");
}).catch(() => {
    app.log.error("Not connected");
});
//# sourceMappingURL=index.js.map