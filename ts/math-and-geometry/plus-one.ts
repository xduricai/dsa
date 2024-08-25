export function plusOne(digits: number[]): number[] {
    let carry = 1;
    let idx = digits.length - 1;

    while (idx >= 0 && carry) {
        const num = digits[idx] + carry;
        digits[idx] = num % 10;
        carry = Math.floor(num / 10);
        idx--;
    }

    if (carry) {
        digits.unshift(carry);
    }
    return digits;
}
