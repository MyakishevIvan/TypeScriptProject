import {Locator, Page} from "@playwright/test";

export class CartPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    getProducts(name: string): Locator {
        return this.page.getByLabel(name)
    }

    async checkout(): Promise<void> {
        await this.page.getByRole("button", { name: "Checkout" }).click()
    }
}