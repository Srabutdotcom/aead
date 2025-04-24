import { AES, ChaCha20Poly1305, GCM } from "../dep.ts";

export function aesgcm(key) {
   key = sanitizeKey(key, [16, 32]);
   return new GCM(new AES(key));
}

export function chachapoly(key) {
   key = sanitizeKey(key, [32]);
   return new ChaCha20Poly1305(key)
}

function sanitizeKey(key, expectedLengths) {
   if (!(key instanceof Uint8Array)) {
      throw new TypeError("key must be a Uint8Array");
   }
   if (!expectedLengths.includes(key.length)) {
      throw new Error(`Key must be ${expectedLengths.join(" or ")} bytes`);
   }
   return key;
}



