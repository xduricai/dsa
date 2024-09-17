export function uncommonFromSentences(s1: string, s2: string): string[] {
    const counts = new Map<string, number>();
    const output = [];

    for (const word of s1.split(" ").concat(s2.split(" "))) {
        counts.set(word, (counts.get(word) || 0) + 1);
    }
    for (const word of s2.split(" ")) {
        counts.set(word, (counts.get(word) || 0) + 1);
    }

    for (const [key, value] of counts.entries()) {
        if (value === 1) {
            output.push(key);
        }
    }
    return output;
}

export function uncommonFromSentencesAlt(s1: string, s2: string): string[] {
    const counts = new Map<string, number>();

    for (const word of s1.split(" ").concat(s2.split(" ")))
        counts.set(word, (counts.get(word) || 0) + 1);

    return [...counts.entries()]
        .filter(([_, count]) => count === 1)
        .map(([word, _]) => word);
}
