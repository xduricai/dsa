// more compact version
export function shortestCommonSupersequence(
    str1: string,
    str2: string
): string {
    let dp = Array(str2.length + 1).fill("");

    // init 0-th row
    for (let col = 0; col <= str2.length; col++) {
        dp[col] = str2.slice(0, col);
    }

    for (let row = 1; row <= str1.length; row++) {
        const current = Array(str2.length + 1).fill("");
        current[0] = str1.slice(0, row);

        for (let col = 1; col <= str2.length; col++) {
            if (str1[row - 1] === str2[col - 1]) {
                current[col] = `${dp[col - 1]}${str1[row - 1]}`;
            } else if (dp[col].length < current[col - 1].length) {
                current[col] = `${dp[col]}${str1[row - 1]}`;
            } else {
                current[col] = `${current[col - 1]}${str2[col - 1]}`;
            }
        }

        dp = current;
    }
    return dp[str2.length];
}

export function shortestCommonSupersequenceAlt(
    str1: string,
    str2: string
): string {
    const dp = Array(str1.length + 1)
        .fill(null)
        .map((_) => Array(str2.length + 1).fill(""));

    // init 0-th row and column
    for (let row = 0; row <= str1.length; row++) {
        dp[row][0] = str1.slice(0, row);
    }
    for (let col = 0; col <= str2.length; col++) {
        dp[0][col] = str2.slice(0, col);
    }

    for (let row = 1; row <= str1.length; row++) {
        for (let col = 1; col <= str2.length; col++) {
            // current char from str1
            const char1 = str1[row - 1];
            // current char from str2
            const char2 = str2[col - 1];

            // shortest string without using char1 or char2
            const shortest = dp[row - 1][col - 1];
            // shortest string without using char2
            const shortest1 = dp[row][col - 1];
            // shortest string without using char1
            const shortest2 = dp[row - 1][col];

            // append the shared character
            if (char1 === char2) {
                dp[row][col] = `${shortest}${char1}`;
            }
            // append char1 (char2 is already appended)
            else if (shortest2.length < shortest1.length) {
                dp[row][col] = `${shortest2}${char1}`;
            }
            // append char2 (char1 is already appended)
            else {
                dp[row][col] = `${shortest1}${char2}`;
            }
        }
    }
    return dp[str1.length][str2.length];
}
