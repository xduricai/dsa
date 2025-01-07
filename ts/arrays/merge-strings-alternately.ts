export function mergeAlternately(word1: string, word2: string): string {
    const max = Math.min(word1.length, word2.length);
    let res = "";

    for (let idx = 0; idx < max; idx++) {
        res = `${res}${word1[idx]}${word2[idx]}`;
    }

    return `${res}${word1.substring(max)}${word2.substring(max)}`;
}
