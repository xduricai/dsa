export function takeCharacters(s: string, k: number): number {
    const OFFSET = "a".charCodeAt(0);
    const getIdx = (char: string) => char.charCodeAt(0) - OFFSET;

    const totals = [0, 0, 0];

    for (const char of s) {
        totals[getIdx(char)]++;
    }

    if (totals.some((total) => total < k)) {
        return -1;
    }

    let max = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        totals[getIdx(s[right])]--;

        while (totals.some((total) => total < k) && left <= right) {
            totals[getIdx(s[left])]++;
            left++;
        }

        max = Math.max(max, right - left + 1);
    }

    return s.length - max;
}
