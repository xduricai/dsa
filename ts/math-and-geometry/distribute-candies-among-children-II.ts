// LC 2929 (https://leetcode.com/problems/distribute-candies-among-children-ii)

export function distributeCandies(n: number, limit: number): number {
    let res = 0;

    for (let idx = 0; idx <= Math.min(limit, n); idx++) {
        if (n - idx > 2 * limit) {
            continue;
        }
        res += Math.min(n - idx, limit) - Math.max(0, n - idx - limit) + 1;
    }
    return res;
}
