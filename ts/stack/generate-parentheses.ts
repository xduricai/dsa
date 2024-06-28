export function generateParenthesis(n: number) {
    const ret: string[] = [];
    const stack: string[] = [];

    const backtrack = (open: number, closed: number) => {
        if (open === closed && closed === n) {
            ret.push(stack.join(""))
            return;
        }

        if (open < n) {
            stack.push("(");
            backtrack(open + 1, closed);
            stack.pop();
        }

        if (closed < open) {
            stack.push(")");
            backtrack(open, closed + 1);
            stack.pop();
        }
    }
    backtrack(0, 0)
    return ret;
}