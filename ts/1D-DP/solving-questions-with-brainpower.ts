// LC 2140 (https://leetcode.com/problems/solving-questions-with-brainpower)

// iterative solution
export function mostPoints(questions: number[][]): number {
    const n = questions.length;
    const DP = Array(n + 1).fill(0);

    for (let idx = n - 1; idx >= 0; idx--) {
        const skip = DP[idx + 1];
        const answerIdx = idx + 1 + questions[idx][1];
        let answer = questions[idx][0];

        if (answerIdx <= n) {
            answer += DP[answerIdx];
        }

        DP[idx] = Math.max(skip, answer);
    }

    return DP[0];
}

// recursive solution
export function mostPointsDfs(questions: number[][]): number {
    const DP = Array(questions.length).fill(0);

    const dfs = (idx: number) => {
        if (idx >= questions.length) {
            return 0;
        }
        if (DP[idx]) {
            return DP[idx];
        }

        const skip = dfs(idx + 1);
        const answer = questions[idx][0] + dfs(idx + 1 + questions[idx][1]);

        DP[idx] = Math.max(skip, answer);
        return DP[idx];
    };

    return dfs(0);
}
