import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapSchema } from "../types";
import { PrismaClient } from "../generated/prisma";

const zapRouter = Router();
const prismaClient = new PrismaClient();

zapRouter.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId: string = req.userId;
    const body = req.body;
    
    console.log('userId from middleware:', userId);
    
    if (!userId) {
        return res.status(401).json({
            message: "User ID not found in request"
        });
    }
    
    const parsedData = ZapSchema.safeParse(body);
    
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }   

    try {
        const zapId = await prismaClient.$transaction(async tx => {
            const zap = await tx.zap.create({
                data: {
                    userId: parseInt(userId),
                    triggerid: "", 
                    actions: {
                        create: parsedData.data.actions.map((x, index) => ({
                            actionid: x.actionId, 
                            order: index,
                        }))
                    }
                }
            })

            const trigger = await tx.trigger.create({
                data: {
                    triggerid: parsedData.data.triggerId, 
                    zapid: zap.id, 
                }
            });

            await tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerid: trigger.id 
                }
            })

            return zap.id;
        });

        return res.json({
            zapId
        });
    } catch (error) {
        console.error("Error creating zap:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

zapRouter.get("/", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const zaps = await prismaClient.zap.findMany({
            where: {
                userId: parseInt(userId)
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

        return res.json({
            zaps
        });
    } catch (error) {
        console.error("Error fetching zaps:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

zapRouter.get("/:zapId", authMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const zapId = req.params.zapId;

        const zap = await prismaClient.zap.findFirst({
            where: {
                id: zapId,
                userId: parseInt(userId) 
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

        if (!zap) {
            return res.status(404).json({
                message: "Zap not found"
            });
        }

        return res.json({
            zap
        });
    } catch (error) {
        console.error("Error fetching zap:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})

export default zapRouter;