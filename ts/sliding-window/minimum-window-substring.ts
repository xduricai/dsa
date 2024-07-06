export function minWindow(s: string, t: string) {
    if (t.length === 0 || t.length > s.length) return "";

    const counts = new Map();
    const window = new Map(); 

    for (let char of t) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }
    const target = counts.size;
    let matches = 0;
    let ret = "";
    let retLen = Infinity;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        window.set(s[right], (window.get(s[right]) || 0) + 1);

        if (counts.has(s[right]) && counts.get(s[right]) === window.get(s[right])) {
            matches++;
        }

        while (matches === target) {
            if (right - left + 1 < retLen) {
                ret = s.slice(left, right + 1);
                retLen = right - left + 1;
            }
            window.set(s[left], window.get(s[left]) - 1);

            if (counts.has(s[left]) && window.get(s[left]) < counts.get(s[left])) {
                matches--;
            }
            left++;
        }
    }
    return ret;
}