export function countSubstrings(s: string): number {
    let total = 0;

    for (let idx = 0; idx < s.length; idx++) {
        total += countPalindromes(s, idx, idx);
        total += countPalindromes(s, idx, idx + 1);
    }
    return total;
}

function countPalindromes(s: string, left: number, right: number): number {
    let count = 0;

    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
        count++;
    }
    return count;
}
