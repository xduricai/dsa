export function minWindow(s: string, t: string): string {
    const counts = new Map();
    const window = new Map();

    for (let char of t) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }
    const target = counts.size;
    let matches = 0;
    let left = 0;
    let ret = "";

    for (let right = 0; right < s.length; right++) {
        window.set(s[right], (window.get(s[right]) || 0) + 1);

        if (
            counts.has(s[right]) &&
            counts.get(s[right]) === window.get(s[right])
        ) {
            matches++;
        }

        while (matches === target) {
            if (right - left + 1 < ret.length || ret.length === 0) {
                ret = s.slice(left, right + 1);
            }

            if (
                counts.has(s[left]) &&
                counts.get(s[left]) === window.get(s[left])
            ) {
                matches--;
            }
            window.set(s[left], window.get(s[left]) - 1);
            left++;
        }
    }
    return ret;
}
