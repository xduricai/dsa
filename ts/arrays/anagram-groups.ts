export function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    
    for (let str of strs) {
        const sorted = str.split("").sort().join("");
        const group = map.get(sorted);

        if (!sorted) {
            map.set(sorted, [str]);
            continue;
        }
        group.push(str);
    }
    return [...map.values()];
};