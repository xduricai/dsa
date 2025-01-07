export function longestCommonPrefix(strs: string[]): string {
    strs.sort();
    const first = strs[0];
    const last = strs[strs.length - 1];
    const max = Math.min(first.length, last.length);

    for (let idx = 0; idx <= max; idx++) {
        if (idx === max || first[idx] !== last[idx]) {
            return first.slice(0, idx);
        }
    }
}
