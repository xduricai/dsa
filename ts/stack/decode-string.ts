export function decodeString(s: string): string {
    const stack = [];
    let currentStr = "";
    let currentNum = "";

    for (const char of s) {
        if (isNum(char)) {
            currentNum = `${currentNum}${char}`;
        } else if (char === "[") {
            stack.push(currentStr);
            stack.push(currentNum);

            currentStr = "";
            currentNum = "";
        } else if (char === "]") {
            const num = parseInt(stack.pop());
            const str = stack.pop();
            currentStr = `${str}${currentStr.repeat(num)}`;
        } else {
            currentStr = `${currentStr}${char}`;
        }
    }

    return currentStr;
}

function isNum(char: string) {
    const code = char.charCodeAt(0);
    const ZERO = "0".charCodeAt(0);
    const NINE = "9".charCodeAt(0);

    return code >= ZERO && code <= NINE;
}

export function decodeStringAlt(s: string): string {
    const numStack = [];
    const charStack = [""];
    let currentNum = "";

    for (const char of s) {
        if (fromRange(char, "a", "z")) {
            const last = charStack.pop();
            charStack.push(`${last}${char}`);
        } else if (fromRange(char, "0", "9")) {
            currentNum = `${currentNum}${char}`;
        } else if (char === "[") {
            const num = parseInt(currentNum);
            numStack.push(num);
            charStack.push("");
            currentNum = "";
        } else {
            const num = numStack.pop();
            const chars = charStack.pop();
            const str = chars.repeat(num);

            const last = charStack.pop();
            charStack.push(`${last}${str}`);
        }
    }

    return charStack.pop();
}

function fromRange(char: string, start: string, end: string) {
    const code = char.charCodeAt(0);
    const START = start.charCodeAt(0);
    const END = end.charCodeAt(0);

    return code >= START && code <= END;
}
