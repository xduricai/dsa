export function asteroidCollision(asteroids: number[]): number[] {
    const stack = [];

    for (const rock of asteroids) {
        if (rock > 0) {
            stack.push(rock);
            continue;
        }

        while (stack.length && stack.at(-1) > 0 && -rock > stack.at(-1)) {
            stack.pop();
        }

        if (!stack.length || stack.at(-1) < 0) {
            stack.push(rock);
        } else if (stack.at(-1) === -rock) {
            stack.pop();
        }
    }

    return stack;
}
