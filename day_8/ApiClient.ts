export class ApiClient {

    async get<T>(data: T, delay: number = 300): Promise<T> {
        await this.setTimeout(delay);
        return data;
    }

    async post<T>(data: T, delay: number = 300): Promise<T> {
        await this.setTimeout(delay);
        return data;
    }

    async setTimeout(delay:number): Promise<void> {
        await new Promise(resolve =>
            setTimeout(resolve, delay))
    }
}