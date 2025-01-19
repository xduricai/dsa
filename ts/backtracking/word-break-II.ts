// slightly optimized memoization solution
export function wordBreak(s: string, wordDict: string[]): string[] {
    const words = new Set(wordDict);
    const cache = new Map<number, string[]>([[s.length, [""]]]);

    const backtrack = (start: number) => {
        if (cache.has(start)) {
            return cache.get(start);
        }

        const res = [];

        for (let end = start + 1; end <= s.length; end++) {
            const word = s.slice(start, end);
            if (!words.has(word)) {
                continue;
            }

            for (const sentence of backtrack(end)) {
                // do not add a space when adding the last word of the sentence
                if (sentence) {
                    res.push(`${word} ${sentence}`);
                } else {
                    res.push(word);
                }
            }
        }

        cache.set(start, res);
        return res;
    };

    return backtrack(0);
}

// standard backtracking solution
export function wordBreakBT(s: string, wordDict: string[]): string[] {
    const words = new Set(wordDict);
    const res = [];
    const current = [];

    const backtrack = (start: number) => {
        if (start === s.length) {
            res.push(current.join(" "));
        }

        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (!words.has(word)) {
                continue;
            }

            current.push(word);
            backtrack(end);
            current.pop();
        }
    };

    backtrack(0);
    return res;
}
