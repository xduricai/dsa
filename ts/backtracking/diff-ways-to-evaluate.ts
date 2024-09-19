export function diffWaysToCompute(expression: string): number[] {
    const isOperator = (char: string) =>
        char === "+" || char === "-" || char === "*";

    const backtrack = (left: number, right: number) => {
        const res = [];

        for (let idx = left; idx <= right; idx++) {
            if (!isOperator(expression[idx])) {
                continue;
            }
            const numsLeft = backtrack(left, idx - 1);
            const numsRight = backtrack(idx + 1, right);

            for (const numLeft of numsLeft) {
                for (const numRight of numsRight) {
                    res.push(evaluate(numLeft, numRight, expression[idx]));
                }
            }
        }

        if (!res.length) {
            res.push(parseInt(expression.slice(left, right + 1)));
        }
        return res;
    };
    return backtrack(0, expression.length - 1);
}

function evaluate(left: number, right: number, op: string) {
    if (op === "+") {
        return left + right;
    }
    if (op === "-") {
        return left - right;
    }
    if (op === "*") {
        return left * right;
    }
    return 0;
}
