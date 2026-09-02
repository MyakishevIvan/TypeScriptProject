import {Locator, Page} from "@playwright/test";

class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly login: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.username = page.getByLabel("")
        this.password = page.getByLabel("")
        this.login = page.getByLabel("")
        this.errorMessage = page.getByLabel("")
    }

    async open(): Promise<void> {
    }

    async login(credential: Credential): Promise<void> {

    }
}