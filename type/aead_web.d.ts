import { TLSInnerPlaintext } from "../src/dep.ts";

/**
 * Class for Authenticated Encryption with Associated Data (AEAD) using WebCrypto API
 * @version __VERSION__
 */
export class Aead_Web {
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
    * The imported CryptoKey for Web Crypto API.
    */
   cryptoKey: CryptoKey | null ;
 
   /**
    * Creates a new Aead_Web instance.
    * @param {Uint8Array} key - The encryption key.
    * @param {Uint8Array} iv - The initialization vector (IV).
    */
   constructor(key: Uint8Array, iv: Uint8Array);
 
   /**
    * Imports the raw key into a CryptoKey object if it hasn't been imported yet.
    * @returns {Promise<void>} - A promise that resolves when the key is imported.
    */
   importKey(): Promise<void>;
 
   /**
    * Encrypts and authenticates the content using AES-GCM via Web Crypto API.
    * @param {Uint8Array} content - The content to encrypt.
    * @param {number} type - The type of the content.
    * @param {number} numZeros - The number of zero bytes to append.
    * @returns {Promise<Uint8Array>} - A promise that resolves with the sealed ciphertext including the authentication tag.
    */
   encrypt(content: Uint8Array, type: number, numZeros: number): Promise<Uint8Array>;
 
   /**
    * Decrypts and authenticates the ciphertext using AES-GCM via Web Crypto API.
    * @param {Uint8Array} ciphertext - The ciphertext to decrypt.
    * @returns {Promise<TLSInnerPlaintext>} - A promise that resolves with the decrypted plaintext as a TLSInnerPlaintext object.
    * @throws {Error} - If the decryption or authentication fails.
    */
   decrypt(ciphertext: Uint8Array): Promise<TLSInnerPlaintext>;
 }