import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapSchema } from "../types";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
const zapRouter = Router();

zapRouter.post("/", authMiddleware,async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const body = req.body;
    const parsedData  = ZapSchema.safeParse(body); 
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"
        });
    }
    
    try {
        await prisma.$transaction(async tx => {
            const zap = await tx.zap.create({
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

            const trigger = await tx.trigger.create({
                data: {
                    triggerid: parsedData.data.triggerId, // Changed to triggerId
                    zapid: zap.id,
                }
            });

            await tx.zap.update({
                where: { id: zap.id },
                data: { triggerid: trigger.id }
            });
            
            res.status(201).json({
                message: "Zap created successfully",
                zapId: zap.id
            });
        });
    } catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

zapRouter.get("/", authMiddleware,async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const zaps = await prisma.zap.findMany({
            where: {
                userId: userId
            },
            include: {
               actions:{
                include:{
                    type: true
                },
                orderBy: {
                    order: 'asc'
                }
               },
               trigger:{
                include:{
                  type: true
                }
               }
            }
        });
        res.json(zaps);
    } catch (error) {
        console.error("Error fetching zaps:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

zapRouter.get("/:zapId", authMiddleware, async(req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const zapId = req.params.zapId;
        const zap = await prisma.zap.findFirst({
            where: {
                userId: userId,
                id: zapId
            },
            include: {
               actions:{
                include:{
                    type: true
                },
                orderBy: {
                    order: 'asc'
                }
               },
               trigger:{
                include:{
                  type: true
                }
               }
            }
        });
        res.json(zap);
    } catch (error) {
        console.error("Error fetching zap:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
 
export default zapRouter;