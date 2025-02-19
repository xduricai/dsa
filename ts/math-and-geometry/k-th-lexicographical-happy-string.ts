export function getHappyString(n: number, k: number): string {
    const res = [];
    const base = Math.pow(2, n - 1);

    if (k > base * 3) {
        return "";
    }

    if (k <= base) {
        res.push("a");
    } else if (k <= base + base) {
        res.push("b");
        k -= base;
    } else {
        res.push("c");
        k -= base + base;
    }

    for (let pow = n - 2; pow >= 0; pow--) {
        const base = Math.pow(2, pow);

        if (k <= base) {
            res.push(getLower(res.at(-1)));
        } else {
            res.push(getUpper(res.at(-1)));
            k -= base;
        }
    }

    return res.join("");
}

function getLower(char: string): string {
    if (char === "a") {
        return "b";
    } else {
        return "a";
    }
}

function getUpper(char: string): string {
    if (char === "c") {
        return "b";
    } else {
        return "c";
    }
}
