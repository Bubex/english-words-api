"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./config/prisma"));
dotenv_1.default.config();
const PORT = process.env.PORT ?? 3333;
prisma_1.default
    .$connect()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = app_1.default;
//# sourceMappingURL=server.js.map