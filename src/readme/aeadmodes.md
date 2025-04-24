## 🔐 AEAD Cipher Key Lengths in TLS 1.3

| Cipher Suite Name                      | AEAD Algorithm         | **Key Length**        | **Nonce Length**     | **Tag Length**         |
|---------------------------------------|------------------------|------------------------|------------------------|--------------------------|
| `TLS_AES_128_GCM_SHA256`              | AES-128-GCM            | 128 bits (16 bytes)    | 96 bits (12 bytes)     | 128 bits (16 bytes)     |
| `TLS_AES_256_GCM_SHA384`              | AES-256-GCM            | 256 bits (32 bytes)    | 96 bits (12 bytes)     | 128 bits (16 bytes)     |
| `TLS_CHACHA20_POLY1305_SHA256`        | ChaCha20-Poly1305      | 256 bits (32 bytes)    | 96 bits (12 bytes)     | 128 bits (16 bytes)     |
| `TLS_AES_128_CCM_SHA256`              | AES-128-CCM            | 128 bits (16 bytes)    | 96 bits (12 bytes)     | 128 bits (16 bytes)     |
| `TLS_AES_128_CCM_8_SHA256`            | AES-128-CCM (8 tag)    | 128 bits (16 bytes)    | 96 bits (12 bytes)     | 64 bits (8 bytes)       |

the last two are less supported for tls 1.3
