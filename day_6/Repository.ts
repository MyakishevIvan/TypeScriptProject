export interface Repository<T> {
    add(item: T): void;
    getById(id: number): T| undefined;
    getAll(): T[];
    remove(id: number): boolean;
}