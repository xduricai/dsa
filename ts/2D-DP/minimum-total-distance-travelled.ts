export function minimumTotalDistance(
    robot: number[],
    factory: number[][]
): number {
    // sort robots in ascending order
    robot.sort((a, b) => a - b);
    // sort factories by position in descending order
    factory.sort((a, b) => b[0] - a[0]);

    // init the DP array
    const dp = Array(robot.length + 1).fill(Infinity);
    dp[robot.length] = 0;

    // iterate over all factories
    for (const [position, limit] of factory) {
        // explore all starting points for our window of robots
        for (let left = 0; left < robot.length; left++) {
            // sum of distances of robots in the current window from the factory
            let sum = 0;

            // extend the window until the end of the robots array or until the limit of the factory is reached
            for (
                let right = left;
                right < Math.min(robot.length, left + limit);
                right++
            ) {
                // add distance for the current robot to the sum
                sum += Math.abs(robot[right] - position);
                // set result to min of current result and the sum of the window plus the result for the position after the end of the window
                dp[left] = Math.min(dp[left], dp[right + 1] + sum);
            }
        }
    }

    return dp[0];
}

export function minimumTotalDistanceAlt(
    robot: number[],
    factory: number[][]
): number {
    // sort the input arrays
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    // store all individual factory positions into an array as separate elements
    let factoryPositions = [];

    for (const [position, limit] of factory) {
        factoryPositions = factoryPositions.concat(Array(limit).fill(position));
    }

    // the combined distance for 0 robots is 0
    let dp = Array(factoryPositions.length + 1).fill(0);

    // iterate over all robots
    for (const robotPosition of robot) {
        const current = Array(factoryPositions.length + 1).fill(0);
        // it is not possible to assign n robots to 0 factories
        current[0] = Infinity;

        for (let idx = 1; idx <= factoryPositions.length; idx++) {
            // the total cost if we assign the current robot to the current position
            const assign =
                Math.abs(robotPosition - factoryPositions[idx - 1]) +
                dp[idx - 1];
            // the total cost if we do not assign the current robot to the current position
            const skip = current[idx - 1];
            // assign the lower of the 2 costs
            current[idx] = Math.min(assign, skip);
        }

        dp = current;
    }

    // result after considering all robots and all positions
    return dp[factoryPositions.length];
}
