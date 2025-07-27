import { Router } from "express";
import { authMiddleware } from "../middleware";
const zapRouter = Router();

zapRouter.post("/create", authMiddleware, (req, res) => {
    res.send("Zap created successfully");
});

zapRouter.get("/list", authMiddleware, (req, res) => {
    res.send("List of zaps");
});

zapRouter.get("/:zapId", authMiddleware, (req, res) => {
    const zapId = req.params.id;
    res.send(`Details of zap with ID: ${zapId}`);
});
 
export default zapRouter;
