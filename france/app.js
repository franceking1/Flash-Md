"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reagir = void 0;
async function reagir(dest, zok, msg, emoji) {
    await zok.sendMessage(dest, { react: { text: emoji, key: msg.key } });
}
exports.reagir = reagir;
