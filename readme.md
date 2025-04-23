# AEAD Encryption Class

This module exports the `Aead` class, a wrapper for authenticated encryption using AES-GCM. It handles encryption ("sealing") and decryption ("opening") of TLS 1.3 `TLSInnerPlaintext` records using an AEAD cipher with per-record sequence numbers and derived nonces.
@version 0.0.1

---

## Features

- 🔐 Authenticated encryption using AES-GCM.
- 🔁 Internal sequence number tracking for both encryption and decryption.
- 🧩 Composable plaintext generation and ciphertext parsing.
- 📏 Supports dynamic nonce derivation via `ivXorSeq`.

---

## Usage

### Constructor

```js
import { Aead, Aead_Web } from "@tls/aead"
const aead = new Aead(key, iv);
const aead_web = new Aead_Web(key, iv);
```

- `key`: A `Uint8Array` representing the AES key.
- `iv`: A `Uint8Array` representing the initialization vector.

---

### Methods

#### `seal(content, type, numZeros)`

Encrypts `content` and returns an AEAD-sealed record.

```js
const ciphertext = aead.seal(content, type, numZeros);
const ciphertext_web = await aead_web.encrypt(content, type, numZeros);
```

- `content`: The plaintext to encrypt (e.g., `Uint8Array`).
- `type`: A number (e.g., TLS record type).
- `numZeros`: Number of zero-padding bytes to add.
- Returns: `Uint8Array` with AAD + ciphertext.

---

#### `open(ciphertext)`

Decrypts a ciphertext previously sealed by `seal`.

```js
const plaintext = aead.open(ciphertext);
const plaintext_web = aead_web.decrypt(ciphertext_web);
```

- `ciphertext`: The sealed message (as returned by `seal`).
- Returns: An instance of `TLSInnerPlaintext`.

---

## Dependencies

- `GCM` and `AES`: Used internally for AEAD operations.
- `ivXorSeq`: Used to derive unique nonces from IV and sequence number.
- `plus1`: Safely increments sequence number (supports both `Number` and `BigInt`).
- `unity`: Utility for combining `Uint8Array` values.
- `TLSInnerPlaintext`: Expected output structure for decrypted data.

---

## Notes

- Sequence numbers (`seqEnc`, `seqDec`) are tracked and updated automatically.
- This implementation prioritizes using regular integers where possible, and falls back to `BigInt` when safe limits are exceeded.

---

## Example

```js
const key = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const aead = new Aead(key, iv);

const content = new TextEncoder().encode("hello");
const encrypted = aead.seal(content, 23, 1);
const decrypted = aead.open(encrypted);

console.log(new TextDecoder().decode(decrypted.slice(0, -1))); // "hello"
```

---

### Donation

- [Support the project on PayPal](https://paypal.me/aiconeid)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
