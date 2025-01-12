export function canBeValid(s: string, locked: string): boolean {
    if (s.length % 2 === 1) {
        return false;
    }

    let minLeft = 0;
    let maxLeft = 0;

    for (let idx = 0; idx < s.length; idx++) {
        if (locked[idx] === "0") {
            minLeft--;
            maxLeft++;
        } else if (s[idx] === "(") {
            minLeft++;
            maxLeft++;
        } else {
            minLeft--;
            maxLeft--;
        }

        if (maxLeft < 0) {
            return false;
        }
        if (minLeft < 0) {
            minLeft = 0;
        }
    }

    return minLeft === 0;
}

export function canBeValidAlt(s: string, locked: string): boolean {
    if (s.length % 2 === 1) {
        return false;
    }

    const stack = [];
    const wildcards = [];

    for (let idx = 0; idx < s.length; idx++) {
        if (locked[idx] === "0") {
            wildcards.push(idx);
        } else if (s[idx] === "(") {
            stack.push(idx);
        } else {
            if (stack.length) {
                stack.pop();
            } else if (wildcards.length) {
                wildcards.pop();
            } else {
                return false;
            }
        }
    }

    while (stack.length && wildcards.length) {
        if (wildcards.at(-1) < stack.at(-1)) {
            return false;
        }

        wildcards.pop();
        stack.pop();
    }

    return !stack.length;
}
