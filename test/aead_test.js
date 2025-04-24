import { Aead } from "../src/aead.js";

const key = crypto.getRandomValues(new Uint8Array(32));
const iv = crypto.getRandomValues(new Uint8Array(12));

const aead = new Aead(key, iv, "CHACHAPOLY")
const content = Uint8Array.of(1,5,6,8,9);
const type = 22;

const sealed = aead.seal(content, type);
const _opened = aead.open(sealed);

const _null = null;