import { UnionFind } from "../trees/design-disjoint-set";

export function accountsMerge(accounts: string[][]): string[][] {
    const uf = new UnionFind(accounts.length);
    const emailMap = new Map<string, number>();

    for (let aIdx = 0; aIdx < accounts.length; aIdx++) {
        const emails = accounts[aIdx];

        for (let eIdx = 1; eIdx < emails.length; eIdx++) {
            if (emailMap.has(emails[eIdx])) {
                uf.union(aIdx, emailMap.get(emails[eIdx]));
            } else {
                emailMap.set(emails[eIdx], aIdx);
            }
        }
    }

    const emailGroups = new Map<number, string[]>();

    for (const [email, idx] of emailMap.entries()) {
        const root = uf.find(idx);
        const group = emailGroups.get(root);

        if (group) {
            group.push(email);
        } else {
            emailGroups.set(root, [email]);
        }
    }

    const output = [];

    for (const [idx, emails] of emailGroups.entries()) {
        const name = accounts[idx][0];
        output.push([name].concat(emails.sort()));
    }
    return output;
}
