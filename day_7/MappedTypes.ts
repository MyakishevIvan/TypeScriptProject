interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

type ProductFlags = {
    [K in keyof Product] : boolean;
}

