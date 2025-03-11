// optimal solution
export function numberOfSubstrings(s: string): number {
    const A = "a".charCodeAt(0);
    const lastPos = [-1, -1, -1];
    let res = 0;

    for (let idx = 0; idx < s.length; idx++) {
        const pos = s[idx].charCodeAt(0) - A;
        lastPos[pos] = idx;
        res += 1 + Math.min(lastPos[0], lastPos[1], lastPos[2]);
    }

    return res;
}

// sliding window solution
export function numberOfSubstringsAlt(s: string): number {
    const A = "a".charCodeAt(0);
    const counter = [0, 0, 0];
    let res = 0;
    let left = 0;

    const idx = (i: number) => s[i].charCodeAt(0) - A;
    const valid = () => counter[0] && counter[1] && counter[2];

    for (let right = 0; right < s.length; right++) {
        counter[idx(right)]++;

        while (counter[idx(left)] > 1) {
            counter[idx(left)]--;
            left++;
        }

        if (valid()) {
            res += left + 1;
        }
    }

    return res;
}
