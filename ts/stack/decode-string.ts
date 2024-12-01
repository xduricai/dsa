// DFS solution
export function decodeString(s: string): string {
    const [result, _] = parseNext(s, 0);
    return result;
}

// Recursive branch
function parseNext(s: string, start: number): [string, number] {
    let output = "";
    let num = "";

    for (let idx = start; idx < s.length; idx++) {
        if (isNum(s[idx])) {
            num = `${num}${s[idx]}`;
        } else if (s[idx] === "[") {
            const [result, end] = parseNext(s, idx + 1);
            const repeats = parseInt(num) || 1;
            output = `${output}${result.repeat(repeats)}`;

            idx = end;
            num = "";
        } else if (s[idx] === "]") {
            return [output, idx];
        } else {
            output = `${output}${s[idx]}`;
        }
    }

    return [output, s.length];
}

function isNum(char: string) {
    const code = char.charCodeAt(0);
    const ZERO = "0".charCodeAt(0);
    const NINE = "9".charCodeAt(0);

    return code >= ZERO && code <= NINE;
}

function fromRange(char: string, start: string, end: string) {
    const code = char.charCodeAt(0);
    const START = start.charCodeAt(0);
    const END = end.charCodeAt(0);

    return code >= START && code <= END;
}

// Stack solution 1
export function decodeStringAlt1(s: string): string {
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

// Stack solution 2
export function decodeStringAlt2(s: string): string {
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
