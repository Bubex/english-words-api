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
describe('User Endpoints', () => {
    it('should get user profile', async () => {
        const userRes = await (0, supertest_1.default)(server_1.default).post('/api/auth/signin').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        const token = userRes.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/user/me')
            .set('Authorization', token)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('email');
    });
    it('should get user history', async () => {
        const userRes = await (0, supertest_1.default)(server_1.default).post('/api/auth/signin').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        const token = userRes.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/user/me/history')
            .set('Authorization', token)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('results');
        expect(res.body).toHaveProperty('totalDocs');
    });
    it('should get user favorites', async () => {
        const userRes = await (0, supertest_1.default)(server_1.default).post('/api/auth/signin').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        const token = userRes.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/user/me/favorites')
            .set('Authorization', token)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('results');
        expect(res.body).toHaveProperty('totalDocs');
    });
});
//# sourceMappingURL=user.test.js.map