export function romanToInt(s: string): number {
    let total = 0;
    let previous = 1001;

    for (const char of s) {
        const value = getValue(char);

        if (value <= previous) {
            total += value;
            previous = value;
        } else {
            total += value - previous - previous;
        }
    }

    return total;
}

function getValue(char: string): number {
    switch (char) {
        case "M":
            return 1000;
        case "D":
            return 500;
        case "C":
            return 100;
        case "L":
            return 50;
        case "X":
            return 10;
        case "V":
            return 5;
        case "I":
            return 1;
    }

    return 0;
}
