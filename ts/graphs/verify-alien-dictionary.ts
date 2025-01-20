export function isAlienSorted(words: string[], order: string): boolean {
    const orderMap = new Map<string, number>();

    for (let idx = 0; idx < order.length; idx++) {
        orderMap.set(order[idx], idx);
    }

    for (let wordIdx = 1; wordIdx < words.length; wordIdx++) {
        const wordA = words[wordIdx - 1];
        const wordB = words[wordIdx];

        for (let idx = 0; idx < wordA.length; idx++) {
            // wordB is a prefix of wordA and should therefore come before it
            if (idx === wordB.length) {
                return false;
            }

            const a = orderMap.get(wordA[idx]);
            const b = orderMap.get(wordB[idx]);

            if (a < b) {
                break;
            }
            if (b < a) {
                return false;
            }
        }
    }

    return true;
}
