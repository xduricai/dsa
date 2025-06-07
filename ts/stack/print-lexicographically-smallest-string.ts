// LC 2434 (https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string)

export function robotWithString(s: string): string {
    const a = "a".charCodeAt(0);
    const counter = new Array(26).fill(0);
    const stack = [];
    const res = [];

    for (const char of s) {
        counter[char.charCodeAt(0) - a]++;
    }

    for (const char of s) {
        stack.push(char);
        counter[char.charCodeAt(0) - a]--;
        let min = String.fromCharCode(a + 26);

        for (let idx = 0; idx < 26; idx++) {
            if (counter[idx]) {
                min = String.fromCharCode(idx + a);
                break;
            }
        }

        while (stack.length && stack.at(-1) <= min) {
            res.push(stack.pop());
        }
    }

    return res.join("");
}
