export type TimeMapEntry = { value: string; timestamp: number };

export class TimeMap {
    keyStore: Map<string, TimeMapEntry[]>;

    constructor() {
        this.keyStore = new Map();
    }

    set(key: string, value: string, timestamp: number) {
        const arr = this.keyStore.get(key);

        if (!arr) this.keyStore.set(key, [{ value, timestamp }]);
        else arr.push({ value, timestamp });
    }

    get(key: string, timestamp: number) {
        const arr = this.keyStore.get(key);
        if (!arr) return "";

        let low = 0;
        let hi = arr.length - 1;
        let ret = "";

        while (low <= hi) {
            const mid = Math.floor((low + hi) / 2);
            if (arr[mid].timestamp === timestamp) return arr[mid].value;

            if (arr[mid].timestamp < timestamp) {
                ret = arr[mid].value;
                low = mid + 1;
            } else hi = mid - 1;
        }
        return ret;
    }
}
