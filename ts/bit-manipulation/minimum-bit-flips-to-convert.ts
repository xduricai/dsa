export function minBitFlips(start: number, goal: number): number {
    let num = start ^ goal;
    let count = 0;

    while (num) {
        num &= num - 1;
        count++;
    }
    return count;
}
