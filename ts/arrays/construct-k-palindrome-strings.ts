export function canConstruct(s: string, k: number): boolean {
    if (k > s.length) {
        return false;
    }

    const counter = Array(26).fill(0);
    let odd = 0;

    for (const char of s) {
        const idx = char.charCodeAt(0) - "a".charCodeAt(0);
        counter[idx]++;
    }

    for (const count of counter) {
        if (count % 2 === 1) {
            odd++;
        }
    }

    return odd <= k;
}
