export function findCheapestPrice(
    n: number,
    flights: number[][],
    src: number,
    dst: number,
    k: number
): number {
    let prices = Array(n).fill(Infinity);
    prices[src] = 0;

    // k + 1 because 0 stops still lets us do 1 flight
    for (let iter = 0; iter <= k; iter++) {
        const tempPrices = [...prices];

        for (const [source, destination, cost] of flights) {
            if (prices[source] === Infinity) {
                continue;
            }
            tempPrices[destination] = Math.min(
                tempPrices[destination],
                prices[source] + cost
            );
        }
        prices = tempPrices;
    }

    if (prices[dst] === Infinity) {
        return -1;
    }
    return prices[dst];
}
