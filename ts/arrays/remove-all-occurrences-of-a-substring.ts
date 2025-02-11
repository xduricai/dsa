export function removeOccurrences(s: string, part: string): string {
    let curr = "";

    for (const char of s) {
        curr = `${curr}${char}`;

        if (curr.endsWith(part)) {
            curr = curr.slice(0, curr.length - part.length);
        }
    }

    return curr;
}

// stack based approach
export function removeOccurrencesAlt(s: string, part: string): string {
    const n = part.length;
    const stack = [];

    for (const char of s) {
        stack.push(char);

        if (stack.length < n) {
            continue;
        }

        let offset;

        for (offset = 1; offset <= n; offset++) {
            if (stack.at(-offset) !== part.at(-offset)) {
                break;
            }
        }

        if (offset > n) {
            for (let iter = 0; iter < n; iter++) {
                stack.pop();
            }
        }
    }

    return stack.join("");
}
