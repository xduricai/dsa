export function reverse(x: number): number {
    const MIN = -2147483648; // -2^31
    const MAX = 2147483647; // 2^31 - 1

    let res = 0;
    while (x !== 0) {
        const digit = x % 10;
        x = Math.trunc(x / 10);

        // handle integer overflow at the last digit
        if (res > MAX / 10 || (res === MAX / 10 && digit > MAX % 10)) {
            return 0;
        }
        if (res < MIN / 10 || (res === MIN / 10 && digit < MIN % 10)) {
            return 0;
        }
        res = res * 10 + digit;
    }
    return res;
}

// returns the minimum int32 value
export function getMin() {
    return 1 << 31;
}

// returns the maximum int32 value
export function getMax() {
    let max = 0;
    for (let iter = 0; iter < 31; iter++) {
        max <<= 1;
        max |= 1;
    }
    return max;
}
