export function checkInclusion(s1: string, s2: string) {
    if (s1.length > s2.length) return false;

    const counts1 = new Array(26).fill(0);
    const counts2 = new Array(26).fill(0);
    const a = "a".charCodeAt(0);
    let charIdx = 0;
    let matches = 0;

    for (let idx = 0; idx < s1.length; idx++) {
        charIdx = s1.charCodeAt(idx) - a;
        counts1[charIdx]++;
        charIdx = s2.charCodeAt(idx) - a;
        counts2[charIdx]++;
    }
    for (let idx = 0; idx < 26; idx++) {
        if (counts1[idx] === counts2[idx]) matches++;
    }
    let left = 0;
    let right = s1.length;

    while (right < s2.length) {
        if (matches === 26) return true;

        charIdx = s2[right].charCodeAt(0) - a;
        counts2[charIdx]++;
        if (counts1[charIdx] === counts2[charIdx])
            matches++;
        else if (counts1[charIdx] + 1 === counts2[charIdx])
            matches--;

        charIdx = s2[left].charCodeAt(0) - a;
        counts2[charIdx]--;
        if (counts1[charIdx] === counts2[charIdx])
            matches++;
        else if (counts1[charIdx] - 1 === counts2[charIdx])
            matches--;

        left++;
        right++;
    }
    return matches === 26;
}

export function checkInclusionMap(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;
    let map1 = new Map();
    let map2 = new Map();
    let matches = 0;

    for (let idx = 0; idx < s1.length; idx++) {
        map1.set(s1[idx], (map1.get(s1[idx]) || 0) + 1);
        map2.set(s2[idx], (map2.get(s2[idx]) || 0) + 1);
    }
    for (let [key, value] of map1.entries()) {
        if (map2.get(key) === value) matches++;
    }

    let left = 0;
    let right = s1.length;
    let char = "";

    while (right < s2.length) {
        if (matches === map1.size) return true;

        char = s2[left];
        const left1 = map1.get(char);
        const left2 = map2.get(char);

        if (left1 === left2) matches--;
        else if (left1 === left2 - 1) matches++;
        map2.set(char, left2 - 1);

        char = s2[right];
        const right1 = map1.get(char);
        const right2 = map2.get(char) || 0;

        if (right1 === right2) matches--;
        else if (right1 === right2 + 1) matches++;
        map2.set(char, right2 + 1);

        left++;
        right++;
    }
    return matches === map1.size;
};

export function checkInclusionAlt(s1: string, s2: string) {
    const sorted = s1.split("").sort().join("");

    for (let idx = 0; idx < s2.length - s1.length + 1; idx++) {
        const str = s2
            .slice(idx, idx + s1.length)
            .split("")
            .sort()
            .join("");
        if (sorted === str) return true;
    }
    return false;
}