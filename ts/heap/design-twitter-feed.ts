import { Heap } from "./heap";

export class Twitter {
    tweetMap = new Map<number, { id: number; time: number }[]>();
    followMap = new Map<number, Set<number>>();
    time = 0;

    postTweet(userId: number, tweetId: number): void {
        const tweets = this.tweetMap.get(userId);
        const tweet = { id: tweetId, time: this.time };

        if (tweets) {
            tweets.push(tweet);
        } else {
            this.tweetMap.set(userId, [tweet]);
        }
        this.time++;
    }

    getNewsFeed(userId: number): number[] {
        const feed = [];
        const heap = new Heap<[number, number, number, number]>();
        const followees = [...(this.followMap.get(userId) || []), userId];

        for (let followee of followees) {
            const tweets = this.tweetMap.get(followee);
            if (!tweets?.length) continue;

            const latest = tweets[tweets.length - 1];
            heap.add([this.time - latest.time, latest.id, followee, 2]);
        }

        while (feed.length < 10 && heap.length) {
            const [_, tweetId, authorId, offset] = heap.delete();
            feed.push(tweetId);

            const tweets = this.tweetMap.get(authorId);
            if (tweets.length - offset >= 0) {
                const latest = tweets[tweets.length - offset];
                heap.add([
                    this.time - latest.time,
                    latest.id,
                    authorId,
                    offset + 1,
                ]);
            }
        }

        return feed;
    }

    follow(followerId: number, followeeId: number): void {
        const followees = this.followMap.get(followerId);

        if (followees) {
            followees.add(followeeId);
        } else {
            this.followMap.set(followerId, new Set<number>([followeeId]));
        }
    }

    unfollow(followerId: number, followeeId: number): void {
        const followees = this.followMap.get(followerId);
        followees?.delete(followeeId);
    }
}
