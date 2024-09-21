// optimal solution
export function lexicalOrder(n: number): number[] {
    const output = [];
    let current = 1;

    while (output.length < n) {
        output.push(current);

        if (current * 10 <= n) {
            current *= 10;
        } else {
            while (current % 10 === 9 || current === n) {
                current = Math.floor(current / 10);
            }
            current++;
        }
    }
    return output;
}

// brute force solution
export function lexicalOrderAlt(n: number): number[] {
    const output = [];

    const dfs = (num: number) => {
        if (num > n) {
            return;
        }
        output.push(num);

        for (let add = 0; add < 10; add++) {
            dfs(num * 10 + add);
        }
    };

    for (let num = 1; num < 10; num++) {
        dfs(num);
    }
    return output;
}
