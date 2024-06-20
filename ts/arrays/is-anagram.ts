export function isAnagramSort(s: string, t: string): boolean {
    return s.split("").sort().join("") === t.split("").sort().join("");
};

export function isAnagramMap(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const mapS = new Map<string, number>();
    const mapT = new Map<string, number>();

    for (let idx = 0; idx < s.length; idx++) {
        mapS.set(s[idx], (mapS.get(s[idx]) || 0) + 1);
        mapT.set(t[idx], (mapT.get(t[idx]) || 0) + 1);
    }

    for (let key of mapS.keys()) {
        if (mapS.get(key) !== mapT.get(key)) return false;
    }
    return true;
};