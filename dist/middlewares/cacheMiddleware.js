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
exports.cacheMiddleware = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const cacheMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.originalUrl;
    const start = Date.now();
    const cachedResponse = yield redis_1.default.get(key);
    if (cachedResponse) {
        res.setHeader('x-cache', 'HIT');
        res.setHeader('x-response-time', `${Date.now() - start}ms`);
        return res.send(JSON.parse(cachedResponse));
    }
    res.setHeader('x-cache', 'MISS');
    const originalSend = res.send.bind(res);
    res.send = (body) => {
        redis_1.default.set(key, JSON.stringify(body), 'EX', 60 * 60); // Cache por 1 hora
        res.setHeader('x-response-time', `${Date.now() - start}ms`);
        return originalSend(body);
    };
    next();
});
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=cacheMiddleware.js.map