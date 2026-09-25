function identity<T>(value: T): T {
    return value;
}

function pair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(x => x.id === id);
}

export function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}

export function updateProperty<T, K extends keyof T>(
    object: T,
    key: K,
    value: T[K]
): T {
    object[key] = value;
    return object;
}