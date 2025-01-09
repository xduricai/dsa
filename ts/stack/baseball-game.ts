export function calPoints(operations: string[]): number {
    const stack = [];

    for (const op of operations) {
        switch (op) {
            case "+":
                stack.push(stack.at(-1) + stack.at(-2));
                break;
            case "D":
                stack.push(stack.at(-1) + stack.at(-1));
                break;
            case "C":
                stack.pop();
                break;
            default:
                stack.push(parseInt(op));
                break;
        }
    }

    return stack.reduce((acc, curr) => acc + curr, 0);
}
