"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = validationMiddleware;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validationMiddleware(type) {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(type, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            const message = errors
                .map((error) => Object.values(error.constraints || {}).join(', '))
                .join(', ');
            res.status(400).json({ message });
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=validationMiddleware.js.map