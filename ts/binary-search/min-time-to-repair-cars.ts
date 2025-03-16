export function repairCars(ranks: number[], cars: number): number {
    let left = 1;
    let right = Math.min(...ranks) * cars * cars;

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (canRepair(ranks, cars, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

function canRepair(ranks: number[], cars: number, time: number): boolean {
    let repaired = 0;

    for (let idx = 0; idx < ranks.length && repaired < cars; idx++) {
        repaired += Math.floor(Math.sqrt(time / ranks[idx]));
    }

    return repaired >= cars;
}
