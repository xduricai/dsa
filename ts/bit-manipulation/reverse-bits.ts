export function reverseBits(n: number): number {
    let res = 0;

    for (let offset = 0; offset < 32; offset++) {
        const bit = (n >> offset) & 1; // get the bit at current offset
        res |= bit << (31 - offset); // set the bit at corresponding position
    }
    return res >>> 0; // convert to unsigned integer
}
