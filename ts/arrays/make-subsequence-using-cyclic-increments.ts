export function canMakeSubsequence(str1: string, str2: string): boolean {
    if (str2.length > str1.length) {
        return false;
    }

    let idx1 = 0;
    let idx2 = 0;

    while (idx1 < str1.length && idx2 < str2.length) {
        if (areEqual(str1[idx1], str2[idx2])) {
            idx1++;
            idx2++;
        } else {
            idx1++;
        }
    }

    return idx2 === str2.length;
}

function areEqual(charA: string, charB: string) {
    const a1 = charA.charCodeAt(0) - "a".charCodeAt(0);
    const a2 = (a1 + 1) % 26;
    const b = charB.charCodeAt(0) - "a".charCodeAt(0);

    return a1 === b || a2 === b;
}
