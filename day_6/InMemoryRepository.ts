import {Repository} from "./Repository";
import {Product} from "./Product";

export class InMemoryRepository<T extends { id: number }> implements Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }

    getById(id: number): T | undefined {
        return this.items.find((item: T) => item.id === id);
    }

    remove(id: number): boolean {
        const result = this.items.find((item: T) => item.id === id);
        if (result !== undefined) {
            this.items = this.items.filter((item: T) => item.id === id);
            return true;
        }
        return false;
    }

    findByProperty<K extends keyof T>(key: K, value: T[K]): T[] {
        return this.items.filter(item=>item[key]===value)
    }

}