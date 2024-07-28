"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AuthController_1 = __importDefault(require("../../src/controllers/AuthController"));
const UserRepository_1 = require("../../src/repositories/UserRepository");
jest.mock('../../src/repositories/UserRepository');
const mockUserRepository = new UserRepository_1.UserRepository();
describe('AuthController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should sign up a new user', async () => {
        const req = {
            body: {
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const mockUser = {
            id: '1',
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        };
        mockUserRepository.createUser.mockResolvedValue(mockUser);
        await AuthController_1.default.signup(req, res);
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(req.body.name, req.body.email, expect.any(String));
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: mockUser.id,
            name: mockUser.name,
            token: expect.any(String),
        });
    });
    it('should sign in an existing user', async () => {
        const req = {
            body: {
                email: 'testuser@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
        const mockUser = {
            id: 'abc123',
            name: 'Test User',
            email: req.body.email,
            password: hashedPassword,
        };
        mockUserRepository.findUserByEmail.mockResolvedValue(mockUser);
        jest
            .spyOn(bcryptjs_1.default, 'compare')
            .mockImplementation(() => Promise.resolve(true));
        await AuthController_1.default.signin(req, res);
        expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: mockUser.id,
            name: mockUser.name,
            token: expect.any(String),
        });
    });
});
//# sourceMappingURL=AuthController.test.js.map