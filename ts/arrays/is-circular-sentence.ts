export function isCircularSentence(sentence: string): boolean {
    const words = sentence.split(" ");
    words.unshift(words.at(-1));

    for (let idx = 0; idx < words.length - 1; idx++) {
        if (words[idx].at(-1) !== words[idx + 1].at(0)) {
            return false;
        }
    }
    return true;
}
