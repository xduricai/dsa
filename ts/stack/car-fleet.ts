function carFleet(target: number, position: number[], speed: number[]): number {
    if (position.length === 0) return 0;
    const cars = position
        .map((pos, idx) => ({ pos, time: (target - pos) / speed[idx] }))
        .sort((a, b) => b.pos - a.pos);
    const stack = [cars[0]];

    for (let idx = 1; idx < cars.length; idx++) {
        if (cars[idx].time > stack[stack.length - 1].time) {
            stack.push(cars[idx]);
        }
    }
    return stack.length;
};