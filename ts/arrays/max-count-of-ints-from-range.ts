export function maxCount(banned: number[], n: number, maxSum: number): number {
    const banList = new Set(banned.filter((num) => num <= maxSum));
    let sum = 0;
    let count = 0;

    for (let num = 1; num <= n; num++) {
        if (banList.has(num)) {
            continue;
        }
        if (sum + num > maxSum) {
            break;
        }
        sum += num;
        count++;
    }
    return count;
}
