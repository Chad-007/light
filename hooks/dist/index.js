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
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./generated/prisma");
const app = (0, express_1.default)();
const client = new prisma_1.PrismaClient();
app.use(express_1.default.json());
app.post("/hooks/catch/:userid/:zapid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userid;
        const zapid = req.params.zapid;
        const body = req.body; // webhook payload
        console.log(`Received webhook for user ${userid}, zap ${zapid}`);
        // Transaction in prisma - either both happen or neither
        yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const run = yield tx.zapRun.create({
                data: {
                    zapid: zapid,
                    metadata: body,
                }
            });
            yield tx.outBox.create({
                data: {
                    zaprunid: run.id
                }
            });
            console.log(`Created ZapRun ${run.id} and OutBox entry`);
        }));
        res.status(200).json({ message: "Webhook processed successfully" });
    }
    catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
