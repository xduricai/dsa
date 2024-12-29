function numWays(words: string[], target: string): number {
    const PRIME = 10 ** 9 + 7;
    const A = "a".charCodeAt(0);

    const dp = Array(target.length + 1).fill(0);
    dp[0] = 1;

    // iterate over character slots in the dictionary
    for (let idx = 0; idx < words[0].length; idx++) {
        const counter = Array(26).fill(0);

        // count the character occurrences in a given slot
        for (const word of words) {
            const charIdx = word[idx].charCodeAt(0) - A;
            counter[charIdx]++;
        }

        // compute results for every position in target
        for (let targetIdx = target.length - 1; targetIdx >= 0; targetIdx--) {
            const charIdx = target[targetIdx].charCodeAt(0) - A;
            dp[targetIdx + 1] =
                (dp[targetIdx + 1] + dp[targetIdx] * counter[charIdx]) % PRIME;
        }
    }

    return dp.at(-1) % PRIME;
}
