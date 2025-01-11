export function addBinary(a: string, b: string): string {
    let res = "";
    let carry = 0;

    let idxA = a.length - 1;
    let idxB = b.length - 1;

    while (idxA >= 0 || idxB >= 0 || carry > 0) {
        const valA = idxA >= 0 && a[idxA] === "1" ? 1 : 0;
        const valB = idxB >= 0 && b[idxB] === "1" ? 1 : 0;
        const total = valA + valB + carry;

        res = `${total % 2}${res}`;
        carry = total > 1 ? 1 : 0;

        idxA--;
        idxB--;
    }

    return res;
}
