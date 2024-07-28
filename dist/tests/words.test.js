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
describe('Words Endpoints', () => {
    it('should list words with pagination', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/entries/en?search=fire&limit=4')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('results');
        expect(res.body).toHaveProperty('totalDocs');
        expect(res.body).toHaveProperty('page');
        expect(res.body).toHaveProperty('totalPages');
        expect(res.body).toHaveProperty('hasNext');
        expect(res.body).toHaveProperty('hasPrev');
    });
    it('should get word details and add to history', async () => {
        const userRes = await (0, supertest_1.default)(server_1.default).post('/api/auth/signin').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        const token = userRes.body.token;
        const res = await (0, supertest_1.default)(server_1.default)
            .get('/api/entries/en/fire')
            .set('Authorization', token)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('word');
        expect(res.body).toHaveProperty('definition');
    });
});
//# sourceMappingURL=words.test.js.map