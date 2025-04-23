
import { AES, GCM, TLSInnerPlaintext, unity } from "./dep.ts";
import { ivXorSeq } from "./helper/ivxorseq.js";
import { plus1 } from "./helper/plus1.js";

export class Aead {
   iv;
   seqEnc = 0;
   seqDec = 0;
   key;
   gcm;
   constructor(key, iv) {
      this.key = key;
      this.iv = iv;
      this.gcm = new GCM(new AES(key));
   }
   seal(content, type, numZeros) {
      const innerPlainText = unity(content, +type, new Uint8Array(numZeros))
      const aad = Uint8Array.of(23, 3, 3, 0, innerPlainText.length + 16);
      const sealed = this.gcm.seal(
         this.seqEnc == 0 ? this.iv : ivXorSeq(this.iv, this.seqEnc),   // nonce
         innerPlainText,                                                // plaintext
         aad                                                            // associatedData
      )
      this.seqEnc = plus1(this.seqEnc);
      return unity(aad, sealed)
   }
   open(ciphertext) {
      const opened = this.gcm.open(
         this.seqDec == 0 ? this.iv : ivXorSeq(this.iv, this.seqDec),   // nonce
         ciphertext.subarray(5),                                        // sealed
         ciphertext.subarray(0, 5)                                      // associatedData
      );
      this.seqDec = plus1(this.seqDec);
      return TLSInnerPlaintext.from(opened);
   }
}

