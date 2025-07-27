"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapSchema = exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignUpSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    name: zod_1.default.string()
});
exports.SignInSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.ZapSchema = zod_1.default.object({
    triggerId: zod_1.default.string(),
    triggerData: zod_1.default.any().optional(),
    actions: zod_1.default.array(zod_1.default.object({
        actionId: zod_1.default.string(),
        actionData: zod_1.default.any().optional()
    }))
});
