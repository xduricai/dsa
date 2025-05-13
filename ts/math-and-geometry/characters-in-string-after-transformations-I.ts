// LC 3335 (https://leetcode.com/problems/total-characters-in-string-after-transformations-i)

export function lengthAfterTransformations(s: string, t: number): number {
    const mod = 1_000_000_007;
    const a = "a".charCodeAt(0);
    const nums = s.split("").map((char) => char.charCodeAt(0) - a);
    let counter = Array(26).fill(0);
    let res = 0;

    for (const num of nums) {
        counter[num]++;
    }

    for (let rnd = 0; rnd < t; rnd++) {
        const nextCounter = Array(26).fill(0);
        nextCounter[0] = counter.at(-1);
        nextCounter[1] = (counter.at(-1) + counter.at(0)) % mod;

        for (let num = 2; num < counter.length; num++) {
            nextCounter[num] = counter[num - 1];
        }
        counter = nextCounter;
    }

    for (const count of counter) {
        res = (res + count) % mod;
    }

    return res;
}
