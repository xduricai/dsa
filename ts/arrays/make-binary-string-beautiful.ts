export function minChanges(s: string): number {
    let count = 0;

    for (let idx = 0; idx < s.length; idx += 2) {
        if (s[idx] !== s[idx + 1]) {
            count++;
        }
    }

    return count;
}
