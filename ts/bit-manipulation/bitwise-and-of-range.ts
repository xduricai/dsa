export function rangeBitwiseAnd(left: number, right: number): number {
    let offset = 0;

    while (left !== right) {
        left >>= 1;
        right >>= 1;
        offset++;
    }

    return left << offset;
}

export function rangeBitwiseAndAlt(left: number, right: number): number {
    while (left < right) {
        right &= right - 1;
    }
    return right;
}
