"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;
    const start = Date.now();
    const cachedResponse = await redis_1.default.get(key);
    if (cachedResponse) {
        res.setHeader('x-cache', 'HIT');
        res.setHeader('x-response-time', `${Date.now() - start}ms`);
        return res.send(JSON.parse(cachedResponse));
    }
    res.setHeader('x-cache', 'MISS');
    const originalSend = res.send.bind(res);
    res.send = (body) => {
        redis_1.default.set(key, JSON.stringify(body), 'EX', 60 * 60);
        res.setHeader('x-response-time', `${Date.now() - start}ms`);
        return originalSend(body);
    };
    next();
};
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=cacheMiddleware.js.map