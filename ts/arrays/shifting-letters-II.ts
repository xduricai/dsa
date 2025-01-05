function shiftingLetters(s: string, shifts: number[][]): string {
    const A = "a".charCodeAt(0);
    const n = s.length;
    const prefix = Array(n + 1).fill(0);
    const output = Array(n).fill("");

    for (const [start, end, dir] of shifts) {
        // we want the change to be negative if the direction is 0
        let change = dir || -1;

        prefix[start] -= change;
        prefix[end + 1] += change;
    }

    let shift = 0;

    for (let idx = n - 1; idx >= 0; idx--) {
        shift += prefix[idx + 1];

        let code = (s[idx].charCodeAt(0) - A + shift) % 26;
        if (code < 0) {
            code += 26;
        }

        output[idx] = String.fromCharCode(code + A);
    }

    return output.join("");
}
