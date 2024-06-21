export function groupAnagrams(strs: string[]) {
    const map = new Map<string, string[]>();
    
    for (let str of strs) {
        const counts = Array(26).fill(0);
        
        for (let char of str.split("")) {
            counts[char.charCodeAt(0) - 97]++;
        }

        const key = counts.toString();
        const items = map.get(key) || [];
        items.push(str);
        map.set(key, items);
    }
    return [...map.values()];
};

export function groupAnagramsAlt(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    
    for (let str of strs) {
        const sorted = str.split("").sort().join("");
        const group = map.get(sorted);

        if (!group) {
            map.set(sorted, [str]);
            continue;
        }
        group.push(str);
    }
    return [...map.values()];
};