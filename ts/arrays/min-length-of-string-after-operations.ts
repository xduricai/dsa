export function minimumLength(s: string): number {
    const A = "a".charCodeAt(0);
    const counter = Array(26).fill(0);
    let res = 0;

    for (const char of s) {
        const idx = char.charCodeAt(0) - A;
        counter[idx]++;
    }

    for (const count of counter) {
        if (!count) {
            continue;
        }

        if (count % 2 === 1) {
            res += 1;
        } else {
            res += 2;
        }
    }

    return res;
}
