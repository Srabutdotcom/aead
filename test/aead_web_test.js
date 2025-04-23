import { Aead_Web } from "../src/aead_web.js";

const key = crypto.getRandomValues(new Uint8Array(32));
const iv = crypto.getRandomValues(new Uint8Array(12));

const aead = new Aead_Web(key, iv)
const content = Uint8Array.of(1,5,6,8,9);
const type = 22;

const encrypted = await aead.encrypt(content, type);
const _decrypted = await aead.decrypt(encrypted);

const _null = null;