export function convertToTitle(columnNumber: number): string {
    const A = "A".charCodeAt(0);
    let res = "";

    while (columnNumber) {
        // decrement by 1 to map onto the correct character
        columnNumber--;

        const offset = columnNumber % 26;
        const char = String.fromCharCode(A + offset);
        res = `${char}${res}`;

        columnNumber = Math.floor(columnNumber / 26);
    }

    return res;
}
