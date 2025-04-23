
import { unity, TLSInnerPlaintext } from "./dep.ts";
import { ivXorSeq } from "./helper/ivxorseq.js";
import { plus1 } from "./helper/plus1.js";

export class Aead_Web {
   iv;
   seqEnc = 0;
   seqDec = 0;
   key;
   gcm;
   cryptoKey;
   constructor(key, iv) {
      this.key = key;
      this.iv = iv;
   }
   async importKey() {
      if (this.cryptoKey) return
      this.cryptoKey = await crypto.subtle.importKey('raw', this.key, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt'])
   }
   async encrypt(content, type, numZeros) {
      await this.importKey();
      const innerPlainText = unity(content, +type, new Uint8Array(numZeros))
      const aad = Uint8Array.of(23, 3, 3, 0, innerPlainText.length + 16);

      const buffer = await crypto.subtle.encrypt({
         name: "AES-GCM",
         iv: this.seqEnc == 0 ? this.iv : ivXorSeq(this.iv, this.seqEnc),
         additionalData: aad, // as additional data
         //tagLength: 128 //*by default is 128
      }, this.cryptoKey, innerPlainText);

      this.seqEnc = plus1(this.seqEnc);
      return unity(aad, new Uint8Array(buffer))
   }
   async decrypt(ciphertext) {
      await this.importKey();

      const buffer = await crypto.subtle.decrypt({
         name: "AES-GCM",
         iv: this.seqDec == 0 ? this.iv : ivXorSeq(this.iv, this.seqDec),
         additionalData: ciphertext.subarray(0, 5), // as additional data
         //tagLength: 128 //*by default is 128
      }, this.cryptoKey, ciphertext.subarray(5)); // encrypted_record

      this.seqDec = plus1(this.seqDec);
      return TLSInnerPlaintext.from(new Uint8Array(buffer));
   }
}

