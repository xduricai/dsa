// LCS solution
export function longestPalindromeSubseq(s: string): number {
    let reverse = s.split("").reverse().join("");
    let dp = Array(s.length + 1).fill(0);

    for (let row = 1; row <= s.length; row++) {
        const current = Array(s.length + 1).fill(0);

        for (let col = 1; col <= s.length; col++) {
            if (s[row - 1] === reverse[col - 1]) {
                current[col] = 1 + dp[col - 1];
            } else {
                current[col] = Math.max(current[col - 1], dp[col]);
            }
        }
        dp = current;
    }
    return dp[s.length];
}
