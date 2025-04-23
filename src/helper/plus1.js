export function plus1(a) {
   if (typeof a === "number" && a < Number.MAX_SAFE_INTEGER) return a + 1;
   if (typeof a === "bigint") return a + 1n;
   return BigInt(a) + 1n;
}
