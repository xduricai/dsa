export function canCompleteCircuit(gas: number[], cost: number[]): number {
    let totalGas = 0;
    let currentGas = 0;
    let maxIdx = 0;

    for (let idx = 0; idx < gas.length; idx++) {
        totalGas += gas[idx] - cost[idx];
        currentGas += gas[idx] - cost[idx];

        if (currentGas < 0) {
            currentGas = 0;
            maxIdx = idx + 1;
        }
    }

    if (totalGas < 0) {
        return -1;
    }
    return maxIdx;
}
