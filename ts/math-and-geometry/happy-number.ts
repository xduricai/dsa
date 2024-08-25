// O(1) memory
export function isHappy(n: number): boolean {
    let slow = n;
    let fast = sumSquaredDigits(n);

    while (slow != fast) {
        slow = sumSquaredDigits(slow);
        fast = sumSquaredDigits(fast);
        fast = sumSquaredDigits(fast);
    }
    return fast === 1;
}

export function sumSquaredDigits(n: number): number {
    let output = 0;
    while (n > 0) {
        output += Math.pow(n % 10, 2);
        n = Math.trunc(n / 10);
    }
    return output;
}

// O(n) memory
export function isHappyAlt(n: number): boolean {
    const seen = new Set<number>();

    while (!seen.has(n)) {
        seen.add(n);
        n = sumSquaredDigits(n);

        if (n === 1) {
            return true;
        }
    }
    return false;
}
