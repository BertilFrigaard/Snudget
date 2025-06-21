"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
}
exports.isValidUUID = isValidUUID;
