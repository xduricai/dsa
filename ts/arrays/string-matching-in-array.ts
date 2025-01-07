export function stringMatching(words: string[]): string[] {
    const res = new Set<string>();

    for (let left = 0; left < words.length - 1; left++) {
        for (let right = left + 1; right < words.length; right++) {
            if (words[left].includes(words[right])) {
                res.add(words[right]);
            } else if (words[right].includes(words[left])) {
                res.add(words[left]);
            }
        }
    }

    return Array.from(res);
}
