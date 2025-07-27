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
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../generated/prisma");
const config_1 = require("../config");
const userRouter = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }
    const userExists = yield prisma.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    yield prisma.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    });
    // send an email
    res.json({
        message: "User created successfully"
    });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parsedData = types_1.SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }
    const user = yield prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid username or password"
        });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_PASSWORD);
    res.json({
        message: "User signed in successfully",
        token: token
    });
}));
userRouter.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.userId;
    const user = yield prisma.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        message: "User fetched successfully"
    });
}));
exports.default = userRouter;
