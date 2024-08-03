export function isValid(s: string) {
    const stack = [];

    for (let char of s.split("")) {
        if (char === "(" || char === "{" || char === "[") {
            stack.unshift(char);
            continue;
        }
        const top = stack.shift();

        if (
            (char === ")" && top === "(") ||
            (char === "}" && top === "{") ||
            (char === "]" && top === "[")
        )
            continue;

        return false;
    }
    return stack.length === 0;
}
