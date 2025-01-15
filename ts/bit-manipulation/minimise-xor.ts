export function minimizeXor(num1: number, num2: number): number {
    const bitsA = Array(31).fill(false);
    let countB = 0;
    let res = 0;

    // create an array of bits in A, count bits in B
    for (let idx = 0; idx < 31; idx++) {
        bitsA[30 - idx] = !!((num1 >> idx) & 1);
        countB += (num2 >> idx) & 1;
    }

    // make sure 1 bits from A get flipped to 0's, starting with most significant
    for (let idx = 0; idx < 31 && countB; idx++) {
        if (bitsA[idx]) {
            res |= 1 << (30 - idx);
            countB--;
        }
    }

    // flip 0 bits from A to 1's, starting with least significant
    for (let idx = 30; idx >= 0 && countB; idx--) {
        if (!bitsA[idx]) {
            res |= 1 << (30 - idx);
            countB--;
        }
    }

    return res;
}
