// LC 38 (https://leetcode.com/problems/count-and-say)

export function countAndSay(n: number): string {
    let prev = "1";

    for (let num = 2; num <= n; num++) {
        let curr = "";
        let count = 0;

        for (let idx = 0; idx < prev.length; idx++) {
            count++;

            if (idx === prev.length - 1 || prev[idx] !== prev[idx + 1]) {
                curr = `${curr}${count}${prev[idx]}`;
                count = 0;
            }
        }
        prev = curr;
    }

    return prev;
}

export function countAndSayRecursive(n: number): string {
    const cns = (n: number) => {
        if (n <= 1) {
            return "1";
        }

        const prev = cns(n - 1);
        let curr = "";
        let count = 0;

        for (let idx = 0; idx < prev.length; idx++) {
            count++;

            if (idx === prev.length - 1 || prev[idx] !== prev[idx + 1]) {
                curr = `${curr}${count}${prev[idx]}`;
                count = 0;
            }
        }

        return curr;
    };

    return cns(n);
}
