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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const existingUser = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return res.status(201).json({
                id: user.id,
                name: user.name,
                token: `Bearer ${token}`,
            });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return res.status(200).json({
                id: user.id,
                name: user.name,
                token: `Bearer ${token}`,
            });
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map