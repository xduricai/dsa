export function clearDigits(s: string): string {
    const stack = [];

    for (const char of s) {
        if (isNaN(Number(char))) {
            stack.push(char);
        } else {
            stack.pop();
        }
    }

    return stack.join("");
}
