// LC 1128 (https://leetcode.com/problems/number-of-equivalent-domino-pairs)

export function numEquivDominoPairs(dominoes: number[][]): number {
    const counter = new Map<string, number>();
    const pairs = [0, 0, 1];
    let max = 0;
    let res = 0;

    for (const [left, right] of dominoes) {
        const key = left <= right ? `${left}-${right}` : `${right}-${left}`;

        const count = counter.get(key) || 0;
        counter.set(key, count + 1);
        max = Math.max(max, count + 1);
    }

    for (let num = 2; num <= max; num++) {
        pairs.push(pairs.at(-1) + num);
    }

    for (const count of counter.values()) {
        res += pairs[count];
    }

    return res;
}
