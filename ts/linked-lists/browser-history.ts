export class Page {
    url: string;
    next: Page = null;
    prev: Page | null;

    constructor(url: string, prev: Page = null) {
        this.url = url;
        this.prev = prev;
    }
}

export class BrowserHistory {
    activePage: Page;

    constructor(homepage: string) {
        this.activePage = new Page(homepage);
    }

    visit(url: string): void {
        this.activePage.next = new Page(url, this.activePage);
        this.activePage = this.activePage.next;
    }

    back(steps: number): string {
        let iter = 0;

        while (iter < steps && this.activePage.prev) {
            this.activePage = this.activePage.prev;
            iter++;
        }
        return this.activePage.url;
    }

    forward(steps: number): string {
        let iter = 0;

        while (iter < steps && this.activePage.next) {
            this.activePage = this.activePage.next;
            iter++;
        }
        return this.activePage.url;
    }
}
