import {Locator, Page} from "@playwright/test";

class InventoryPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getProduct(name: string): Locator {
        return this.page.getByLabel(name);
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