import z from "zod";

export const SignUpSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string()
});

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const ZapSchema = z.object({
    triggerId: z.string(),
    triggerData: z.any().optional(),
    actionId: z.string(),
    actionData: z.any().optional()
})
