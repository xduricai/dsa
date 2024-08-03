export function letterCombinations(digits: string): string[] {
    const letters = new Map([
        ["0", "+"],
        ["1", ""],
        ["2", "abc"],
        ["3", "def"],
        ["4", "ghi"],
        ["5", "jkl"],
        ["6", "mno"],
        ["7", "pqrs"],
        ["8", "tuv"],
        ["9", "wxyz"],
    ]);
    const output = [];

    const backtrack = (idx: number, current: string) => {
        if (current.length === digits.length) {
            output.push(current);
            return;
        }

        for (let char of letters.get(digits[idx])) {
            current = `${current}${char}`;
            backtrack(idx + 1, current);
            current = current.slice(0, current.length - 1);
        }
    };

    if (digits) backtrack(0, "");
    return output;
}
