/**
 * 
 * {@link https://www.rfc-editor.org/rfc/rfc8446#section-5.3 | Per-Record Nonce }
 * 
 * The per-record nonce for the AEAD
   construction is formed as follows
   1.  The 64-bit record sequence number is encoded in network byte
       order and padded to the left with zeros to iv_length.
   2.  The padded sequence number is XORed with either the static
       client_write_iv or server_write_iv (depending on the role).
 * @param {Uint8Array} iv 12 bytes nonce 
 * @param {number} seq 
 * @returns 
 */
export function ivXorSeq(iv, seq) {
   const nonce = Uint8Array.from(iv);
   let i = 11, n = seq;

   if (typeof seq === "number") {
      while (n > 0 && i > 3) {
         nonce[i] ^= n & 0xff;
         n >>>= 8;
         i--;
      }
   }
   else {
      while (n > 0n && i > 3) {
         nonce[i] ^= Number(n & 0xffn);
         n >>= 8n;
         i--;
      }
   }

   return nonce;
}