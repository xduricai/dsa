// Optimal solution
export function mincostTickets(days: number[], costs: number[]): number {
    const finalDay = days[days.length - 1];
    const DP = Array(finalDay + 1).fill(Infinity);
    DP[0] = 0;
    let idx = 0;

    for (let day = 1; day <= finalDay; day++) {
        if (day < days[idx]) {
            DP[day] = DP[day - 1];
            continue;
        }

        const dayAgo = day - 1;
        const weekAgo = Math.max(0, day - 7);
        const monthAgo = Math.max(0, day - 30);

        DP[day] = Math.min(
            DP[day],
            DP[dayAgo] + costs[0],
            DP[weekAgo] + costs[1],
            DP[monthAgo] + costs[2]
        );
        idx++;
    }

    return DP[finalDay];
}

// Suboptimal true DP solution
export function mincostTicketsAlt(days: number[], costs: number[]): number {
    const DP = Array(days.length + 1).fill(Infinity);
    const tickets = [
        [1, costs[0]],
        [7, costs[1]],
        [30, costs[2]],
    ];
    DP[0] = 0;

    for (let idx = 1; idx <= days.length; idx++) {
        for (const [duration, price] of tickets) {
            let day = idx - 1;

            while (day >= 0 && days[day] + duration > days[idx - 1]) {
                day--;
            }

            DP[idx] = Math.min(DP[idx], DP[day + 1] + price);
        }
    }

    return DP[days.length];
}

// Suboptimal DFS solution
export function mincostTicketsDfs(days: number[], costs: number[]): number {
    const tickets = [
        [1, costs[0]],
        [7, costs[1]],
        [30, costs[2]],
    ];
    const DP = Array(days.length).fill(Infinity);

    const dfs = (idx: number) => {
        if (idx === days.length) {
            return 0;
        }
        if (DP[idx] !== Infinity) {
            return DP[idx];
        }

        for (const [duration, price] of tickets) {
            let day = idx;

            while (day < days.length && days[day] < days[idx] + duration) {
                day++;
            }

            DP[idx] = Math.min(DP[idx], dfs(day) + price);
        }

        return DP[idx];
    };

    return dfs(0);
}
