export function countConsistentStrings(
    allowed: string,
    words: string[]
): number {
    const set = new Set(allowed.split(""));

    const isConsistent = (word: string) => {
        for (const char of word) {
            if (!set.has(char)) {
                return false;
            }
        }
        return true;
    };

    return words.filter((word) => isConsistent(word)).length;
}
