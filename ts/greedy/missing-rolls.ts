export function missingRolls(
    rolls: number[],
    mean: number,
    n: number
): number[] {
    const totalSum = mean * (rolls.length + n);
    let target = totalSum - rolls.reduce((acc, val) => acc + val, 0);

    if (target > 6 * n || target < n) {
        return [];
    }
    const output = [];

    while (target) {
        const dice = Math.min(6, target - n + 1);
        output.push(dice);
        target -= dice;
        n--;
    }
    return output;
}
