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
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const zapRouter = (0, express_1.Router)();
zapRouter.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const body = req.body;
    const parsedData = types_1.ZapSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }
    try {
        yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const zap = yield tx.zap.create({
                data: {
                    userId: userId,
                    triggerid: "",
                    actions: {
                        create: parsedData.data.actions.map((x, index) => ({
                            actionid: x.actionId, // Changed to actionId
                            order: index || 0,
                        }))
                    },
                }
            });
            const trigger = yield tx.trigger.create({
                data: {
                    triggerid: parsedData.data.triggerId, // Changed to triggerId
                    zapid: zap.id,
                }
            });
            yield tx.zap.update({
                where: { id: zap.id },
                data: { triggerid: trigger.id }
            });
            res.status(201).json({
                message: "Zap created successfully",
                zapId: zap.id
            });
        }));
    }
    catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
zapRouter.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const zaps = yield prisma.zap.findMany({
            where: {
                userId: userId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        res.json(zaps);
    }
    catch (error) {
        console.error("Error fetching zaps:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
zapRouter.get("/:zapId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const zapId = req.params.zapId;
        const zap = yield prisma.zap.findFirst({
            where: {
                userId: userId,
                id: zapId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    },
                    orderBy: {
                        order: 'asc'
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });
        res.json(zap);
    }
    catch (error) {
        console.error("Error fetching zap:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
exports.default = zapRouter;
