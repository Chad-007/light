"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const zapRouter = (0, express_1.Router)();
zapRouter.post("/create", middleware_1.authMiddleware, (req, res) => {
    res.send("Zap created successfully");
});
zapRouter.get("/list", middleware_1.authMiddleware, (req, res) => {
    res.send("List of zaps");
});
zapRouter.get("/:zapId", middleware_1.authMiddleware, (req, res) => {
    const zapId = req.params.id;
    res.send(`Details of zap with ID: ${zapId}`);
});
exports.default = zapRouter;
