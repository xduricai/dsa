// tracking total counts and banned senators
export function predictPartyVictory(senate: string): string {
    const banned = Array(senate.length);
    let dire = 0;
    let radiant = 0;
    let direBans = 0;
    let radiantBans = 0;

    for (const char of senate) {
        if (char === "D") {
            dire++;
        } else {
            radiant++;
        }
    }

    while (dire && radiant) {
        for (let idx = 0; idx < senate.length; idx++) {
            if (!dire || !radiant) {
                break;
            }
            if (banned[idx]) {
                continue;
            }

            if (senate[idx] === "D") {
                if (direBans) {
                    banned[idx] = true;
                    direBans--;
                    dire--;
                } else {
                    radiantBans++;
                }
            } else {
                if (radiantBans) {
                    banned[idx] = true;
                    radiantBans--;
                    radiant--;
                } else {
                    direBans++;
                }
            }
        }
    }

    return !dire ? "Radiant" : "Dire";
}

// using 2 queues
export function predictPartyVictoryQueue(senate: string): string {
    const n = senate.length;
    const dire = [];
    const radiant = [];
    let idx = 0;

    for (let charIdx = 0; charIdx < n; charIdx++) {
        if (senate[charIdx] === "R") {
            radiant.push(charIdx);
        } else {
            dire.push(charIdx);
        }
    }

    while (idx < dire.length && idx < radiant.length) {
        const direIdx = dire[idx];
        const radiantIdx = radiant[idx];
        idx++;

        if (direIdx < radiantIdx) {
            dire.push(direIdx + n);
        } else {
            radiant.push(radiantIdx + n);
        }
    }

    return idx < radiant.length ? "Radiant" : "Dire";
}
