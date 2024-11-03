export function combine(n: number, k: number): number[][] {
    const output = [];
    const current = [];

    const backtrack = (start: number) => {
        if (current.length === k) {
            output.push([...current]);
        }

        for (let num = start; num <= n; num++) {
            current.push(num);
            backtrack(num + 1);
            current.pop();
        }
    };

    backtrack(1);
    return output;
}
