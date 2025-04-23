import { GCM, TLSInnerPlaintext } from "../src/dep.ts";

/**
 * Class for Authenticated Encryption with Associated Data (AEAD) using GCM.
 * @version __VERSION__
 */
export class Aead {
  /**
   * The initialization vector (IV).
   */
  iv: Uint8Array;
  /**
   * The sequence number for encryption.
   */
  seqEnc: number | bigint;
  /**
   * The sequence number for decryption.
   */
  seqDec: number | bigint;
  /**
   * The encryption key.
   */
  key: Uint8Array;
  /**
   * The GCM (Galois/Counter Mode) instance.
   */
  gcm: GCM;

  /**
   * Creates a new Aead instance.
   * @param {Uint8Array} key - The encryption key.
   * @param {Uint8Array} iv - The initialization vector (IV).
   */
  constructor(key: Uint8Array, iv: Uint8Array);

  /**
   * Seals (encrypts and authenticates) the content.
   * @param {Uint8Array} content - The content to encrypt.
   * @param {number} type - The type of the content.
   * @param {number} numZeros - The number of zero bytes to append.
   * @returns {Uint8Array} - The sealed ciphertext including the authentication tag.
   */
  seal(content: Uint8Array, type: number, numZeros: number): Uint8Array;

  /**
   * Opens (decrypts and verifies) the ciphertext.
   * @param {Uint8Array} ciphertext - The ciphertext to decrypt.
   * @returns {TLSInnerPlaintext} - The decrypted plaintext as a TLSInnerPlaintext object.
   * @throws {Error} - If the decryption or authentication fails.
   */
  open(ciphertext: Uint8Array): TLSInnerPlaintext;
}