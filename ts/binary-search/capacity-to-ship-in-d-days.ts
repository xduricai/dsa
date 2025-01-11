export function shipWithinDays(weights: number[], days: number): number {
    let left = Math.max(...weights);
    let right = weights.reduce((acc, curr) => acc + curr, 0);

    while (left < right) {
        const maxWeight = (left + right) >> 1;
        const res = calculateDays(weights, maxWeight);

        if (res > days) {
            left = maxWeight + 1;
        } else {
            right = maxWeight;
        }
    }

    return left;
}

function calculateDays(weights: number[], maxWeight: number) {
    let days = 1;
    let current = 0;

    for (const weight of weights) {
        current += weight;

        if (current > maxWeight) {
            current = weight;
            days++;
        }
    }

    return days;
}

export function shipWithinDaysAlt(weights: number[], days: number): number {
    let left = Math.max(...weights);
    let right = weights.reduce((acc, curr) => acc + curr, 0);

    while (left < right) {
        const maxWeight = (left + right) >> 1;

        if (canShip(weights, maxWeight, days)) {
            right = maxWeight;
        } else {
            left = maxWeight + 1;
        }
    }

    return left;
}

function canShip(weights: number[], maxWeight: number, daysLeft: number) {
    let current = 0;

    for (const weight of weights) {
        current += weight;

        if (current > maxWeight) {
            current = weight;
            daysLeft--;
        }

        if (!daysLeft) {
            return false;
        }
    }

    return true;
}
