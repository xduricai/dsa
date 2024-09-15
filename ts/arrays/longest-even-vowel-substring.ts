function findTheLongestSubstring(s: string): number {
    const bitmasks = new Map<number, number>([[0, -1]]);
    let mask = 0;
    let max = 0;

    for (let idx = 0; idx < s.length; idx++) {
        mask ^= getBit(s[idx]);

        if (bitmasks.has(mask)) {
            max = Math.max(max, idx - bitmasks.get(mask));
        } else {
            bitmasks.set(mask, idx);
        }
    }
    return max;
}

function getBit(char: string) {
    switch (char) {
        case "a":
            return 1;
        case "e":
            return 2;
        case "i":
            return 4;
        case "o":
            return 8;
        case "u":
            return 16;
        default:
            return 0;
    }
}
