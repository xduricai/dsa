export function wordBreak(s: string, wordDict: string[]): boolean {
    const canConstruct = Array(s.length).fill(false);

    for (let idx = 0; idx <= s.length; idx++) {
        const slice = s.slice(0, idx + 1);

        for (let word of wordDict) {
            if (slice.endsWith(word)) {
                canConstruct[idx] =
                    slice === word || canConstruct[idx - word.length];

                if (canConstruct[idx]) {
                    break;
                }
            }
        }
    }
    return canConstruct[s.length - 1];
}
