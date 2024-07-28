"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
class UserRepository {
    constructor(prismaClient) {
        this.prisma = prismaClient || new client_1.PrismaClient();
    }
    async createUser(name, email, password) {
        return this.prisma.user.create({
            data: { name, email, password },
        });
    }
    async findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map