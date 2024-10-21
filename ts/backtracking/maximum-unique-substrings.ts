export function maxUniqueSplit(s: string): number {
    const current = new Set<string>();

    const backtrack = (start: number) => {
        if (start === s.length) {
            return 0;
        }

        let res = 0;
        for (let end = start + 1; end <= s.length; end++) {
            const substring = s.slice(start, end);

            if (current.has(substring)) {
                continue;
            }

            current.add(substring);
            res = Math.max(res, 1 + backtrack(end));
            current.delete(substring);
        }

        return res;
    };

    return backtrack(0);
}
