// LC 3136 (https://leetcode.com/problems/valid-word)

export function isValid(word: string): boolean {
    let vowel = false;
    let consonant = false;

    if (word.length < 3) {
        return false;
    }

    for (const char of word) {
        if (/^[0-9]$/i.test(char)) {
            continue;
        }

        if (/^[aeiou]$/i.test(char)) {
            vowel = true;
        } else if (/^[a-z]$/i.test(char)) {
            consonant = true;
        } else {
            return false;
        }
    }

    return vowel && consonant;
}
