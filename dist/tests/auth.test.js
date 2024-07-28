"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const prisma_1 = __importDefault(require("../src/config/prisma"));
const server_1 = __importDefault(require("../src/server"));
beforeAll(async () => {
    await prisma_1.default.$connect();
    server_1.default.listen(4000);
});
afterAll(async () => {
    await prisma_1.default.$disconnect();
});
describe('Auth Endpoints', () => {
    it('should sign up a new user', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/signup').send({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('token');
    });
    it('should sign in an existing user', async () => {
        const res = await (0, supertest_1.default)(server_1.default).post('/api/auth/signin').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('token');
    });
});
//# sourceMappingURL=auth.test.js.map