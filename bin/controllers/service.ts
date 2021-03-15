import fetch, { Response, RequestInit } from 'node-fetch';
import { LinkMonitor } from '../@types/input';
import Statistics from '../stats';

export class Fetch {
    private _options: RequestInit | undefined;
    private _url: string;
    private _raw_response: Response | null = null;
    private _parsed_response: any;
    constructor(url: string, method: string, body?: any) {
        this._url = url;
        if (method === 'POST') {
            this._options = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                },
                redirect: 'follow'
            };
        } else if (method === 'GET') {
            this._options = {
                method: 'GET'
            }
        }
    }

    async fire(): Promise<void> {
        this._raw_response = await fetch(this._url, this._options);
        this._parsed_response = await this._raw_response.json();
    }

    get raw_response(): Response | null {
        return this._raw_response;
    }

    get parsed_response() {
        return this._parsed_response;
    }
}

class ApiService {
    private _API_VERSION;
    private _REDIS_SERVICE_PORT;
    constructor() {
        this._API_VERSION = process.env.API_VERSION;
        this._REDIS_SERVICE_PORT = process.env.REDIS_SERVICE_PORT;
    }

    async saveLink(input: Statistics, link: string): Promise<Fetch> {
        const req = new Fetch(`http://curli.ir:${this._REDIS_SERVICE_PORT}/api/v${this._API_VERSION}/monitorLink`, 'POST', { link, data: input });
        await req.fire();
        return req;
    }

    async saveSite(input: Statistics, domain: string): Promise<Fetch> {
        const req = new Fetch(`http://curli.ir:${this._REDIS_SERVICE_PORT}/api/v${this._API_VERSION}/monitorSite`, 'POST', { domain, data: input });
        await req.fire();
        return req;
    }

    async getLinkStats(link: string, field: string): Promise<LinkMonitor[]> {
        const req = new Fetch(`http://curli.ir:${this._REDIS_SERVICE_PORT}/api/v${this._API_VERSION}/monitor/${link}?field=${field}`, 'GET');
        await req.fire();
        return req.parsed_response;
    }

}

export default (new ApiService());