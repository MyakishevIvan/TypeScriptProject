export interface Repository<T> {
    add(item: T): void;

    get(id: number): T | undefined;

    getAll(): T[];
}