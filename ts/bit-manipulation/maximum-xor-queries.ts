export function getMaximumXor(nums: number[], maximumBit: number): number[] {
    const xors = Array(nums.length);

    let current = 0;
    for (let idx = 0; idx < nums.length; idx++) {
        current ^= nums[idx];
        xors[nums.length - 1 - idx] = current;
    }

    return xors.map((xor) => {
        let k = 0;
        let current = 1;

        for (let offset = 0; offset < maximumBit; offset++) {
            if (!(xor & current)) {
                k += current;
            }
            current <<= 1;
        }

        return k;
    });
}
