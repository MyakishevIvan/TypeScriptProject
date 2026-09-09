import {Locator, Page} from "@playwright/test";

export class InventoryPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    private getProduct(name: string): Locator {
        return this.page.getByTestId("inventory-item").filter({hasText: name});
    }

    getCartBadge(): Locator {
        return this.page.getByTestId("shopping-cart-badge")
    }

    async addProductToCart(name: string): Promise<void> {
        const product = this.getProduct(name);
        await product.getByRole("button", {name: "Add to cart"}).click()
    }

    async openCart(): Promise<void> {
        await this.page.getByTestId("shopping-cart-link").click();
    }

}