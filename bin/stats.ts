import { LinkMonitor } from './@types/input';

interface Useragent {
    platform: string,
    os: string,
    browser: string
}

class Statistics {
    
    private _view_count: number;
    private _individual_view_count: Set<string>;
    private _ip: string | string[];
    private _agent: Useragent | Useragent[];

    constructor(input: LinkMonitor | LinkMonitor[]) {
        this._individual_view_count = new Set<string>();
        if (Array.isArray(input)) {
            this._view_count = input.length;
            this._ip = input.map(({ ip }) => {
                this._individual_view_count.add(ip);
                return ip;
            });
            this._agent = input.map(({ useragent }) => ({ 
                os: useragent.os,
                platform: useragent.platform,
                browser: useragent.browser
            } as Useragent));
        } else {
            this._view_count = 0;
            this._ip = input.ip;
            this._agent = {
                os: input.useragent.os,
                platform: input.useragent.platform,
                browser: input.useragent.browser
            } as Useragent;
        }
    }

    get views(): number {
        return this._view_count;
    }

    get individualCount(): number {
        return this._individual_view_count.size;
    }

    get ip(): string | string[] {
        return this._ip;
    }

    get useragent(): Useragent | Useragent[] {
        return this._agent;
    }

}


export default Statistics;