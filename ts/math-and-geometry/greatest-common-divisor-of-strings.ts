// linear time solution
export function gcdOfStrings(str1: string, str2: string): string {
    const g = gcd(str1.length, str2.length);

    for (let idx = 0; idx < str1.length; idx++) {
        if (str1[idx] !== str1[idx % g]) {
            return "";
        }
    }

    for (let idx = 0; idx < str2.length; idx++) {
        if (str2[idx] !== str1[idx % g]) {
            return "";
        }
    }

    return str1.slice(0, g);
}

function gcd(a: number, b: number) {
    let temp = 0;

    while (b !== 0) {
        temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// try all prefixes with the correct length, starting at the longest one
export function gcdOfStringsAlt(str1: string, str2: string): string {
    const m = str1.length;
    const n = str2.length;

    const isDivisor = (prefix: string) => {
        const len = prefix.length;

        if (m % len !== 0 || n % len !== 0) {
            return false;
        }

        return (
            prefix.repeat(m / len) === str1 && prefix.repeat(n / len) === str2
        );
    };

    for (let idx = Math.min(m, n) - 1; idx >= 0; idx--) {
        const slice = str1.slice(0, idx + 1);

        if (isDivisor(slice)) {
            return slice;
        }
    }

    return "";
}
