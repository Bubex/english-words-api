"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCursor = encodeCursor;
exports.decodeCursor = decodeCursor;
function encodeCursor(cursor) {
    return Buffer.from(cursor).toString('base64');
}
function decodeCursor(cursor) {
    return Buffer.from(cursor, 'base64').toString('ascii');
}
//# sourceMappingURL=cursor.js.map