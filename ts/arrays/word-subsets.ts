export function wordSubsets(words1: string[], words2: string[]): string[] {
    const minCounts = Array(26).fill(0);
    const res = [];

    for (const word of words2) {
        const counts = countLetters(word);

        for (let idx = 0; idx < 26; idx++) {
            minCounts[idx] = Math.max(minCounts[idx], counts[idx]);
        }
    }

    for (const word of words1) {
        const counts = countLetters(word);

        if (counts.every((count, idx) => count >= minCounts[idx])) {
            res.push(word);
        }
    }

    return res;
}

function countLetters(word: string): number[] {
    const A = "a".charCodeAt(0);
    const counts = Array(26).fill(0);

    for (const char of word) {
        const idx = char.charCodeAt(0) - A;
        counts[idx]++;
    }

    return counts;
}
