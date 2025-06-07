// LC 3710 (https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars)

export function clearStars(s: string): string {
    const a = "a".charCodeAt(0);
    const positions = Array.from({ length: 26 }, () => []);
    const include = Array(s.length).fill(true);

    const push = (idx: number) => {
        const code = s[idx].charCodeAt(0) - a;
        positions[code].push(idx);
    };

    const pop = () => {
        for (let char = 0; char < 26; char++) {
            if (!positions[char].length) {
                continue;
            }
            const idx = positions[char].pop();
            include[idx] = false;
            break;
        }
    };

    for (let idx = 0; idx < s.length; idx++) {
        if (s[idx] !== "*") {
            push(idx);
        } else {
            include[idx] = false;
            pop();
        }
    }

    return s
        .split("")
        .filter((_, idx) => include[idx])
        .join("");
}
