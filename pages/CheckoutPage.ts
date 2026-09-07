import {Page} from "@playwright/test";
import {Customer} from "../models/Customer";

class CheckoutPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCustomerInfo(customer: Customer): Promise<void> {
        await this.page.getByRole("textbox", {name: "First Name"})
            .fill(customer.firstName);
        await this.page.getByRole("textbox", {name: "Last Name"})
            .fill(customer.lastName)
        await this.page.getByRole("textbox", {name: "Zip/Postal Code"})
            .fill(customer.postalCode)
    }

    async continue(): Promise<void> {
        await this.page.getByRole("button", {name: "Continue"}).click();
    }

    async finish(): Promise<void> {
        await this.page.getByRole("button", {name: "Finish"}).click();
    }

}