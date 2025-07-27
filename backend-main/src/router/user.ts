import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignInSchema,SignUpSchema } from "../types";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma";
import { JWT_PASSWORD } from "../config";
const userRouter = Router();
const prisma = new PrismaClient();
userRouter.post("/signup",async (req, res) => {
    const body = req.body;
    const parsedData = SignUpSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"})
    }
    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    await prisma.user.create({
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
}
);

userRouter.post("/signin",async (req, res) => {
    const body = req.body;
    const parsedData = SignInSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input data"})
    }
    const user = await prisma.user.findFirst({
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
    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD);

    res.json({
        message: "User signed in successfully",
        token: token
    });

});

userRouter.get("/", authMiddleware,async (req, res) => {
    // @ts-ignore
    const id = req.userId;
    const  user =  await prisma.user.findFirst({
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
});

export default userRouter;
