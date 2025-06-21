"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logError(e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
    else {
        console.error("Unknown error: " + e);
    }
}
exports.logError = logError;
