export function maximumLength(s: string): number {
    const counter = new Map();
    let max = 0;

    // track the top 3 longest substrings for each character
    const updateTop = (char: string, count: number) => {
        let topThree = counter.get(char) || [0, 0, 0];

        if (count > topThree[0]) {
            topThree = [count, topThree[0], topThree[1]];
        } else if (count > topThree[1]) {
            topThree = [topThree[0], count, topThree[1]];
        } else if (count > topThree[2]) {
            topThree = [topThree[0], topThree[1], count];
        }
        counter.set(char, topThree);
    };

    let count = 0;
    for (let idx = 0; idx < s.length; idx++) {
        if (idx === 0 || s[idx - 1] === s[idx]) {
            count++;
            continue;
        }

        updateTop(s[idx - 1], count);
        count = 1;
    }
    // check the last substring in the array
    updateTop(s[s.length - 1], count);

    for (const [first, second, third] of counter.values()) {
        // 1. all substrings are the same length as the shortest one
        // 2. we use the middle substring to produce 1 substring and the longest one to produce 2
        // 3. we use the longest substring to produce all 3
        const count = Math.max(third, Math.min(first - 1, second), first - 2);
        max = Math.max(max, count);
    }

    return max || -1;
}
