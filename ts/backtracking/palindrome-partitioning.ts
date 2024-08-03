export function partition(s: string): string[][] {
    const output: string[][] = [];
    const current: string[] = [];

    const backtrack = (start: number) => {
        if (start >= s.length) {
            output.push([...current]);
            return;
        }

        for (let idx = start; idx < s.length; idx++) {
            if (!isPalindrome(s, start, idx)) continue;
            current.push(s.slice(start, idx + 1));
            backtrack(idx + 1);
            current.pop();
        }
    };

    backtrack(0);
    return output;
}

function isPalindrome(s: string, left: number, right: number) {
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}
