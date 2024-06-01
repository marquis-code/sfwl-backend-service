"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWalletId = void 0;
const crypto_1 = require("crypto");
function generateWalletId(name, phone, email) {
    const hash = (0, crypto_1.createHash)('sha256');
    hash.update(name + phone + email);
    return hash.digest('hex').slice(0, 16);
}
exports.generateWalletId = generateWalletId;
//# sourceMappingURL=generateWalletId.js.map