import {Locator, Page} from "@playwright/test";
import {Credentials} from "../models/Credentials";

export class LoginPage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly page: Page;

    constructor(page: Page) {
        this.username = page.getByRole("textbox", {name: "Username"});
        this.password = page.getByRole("textbox", {name: "Password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.errorMessage = page.getByTestId("error")
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto("/")
    }

    async login(credential: Credentials): Promise<void> {
        await this.username.fill(credential.username)
        await this.password.fill(credential.password)
        await this.loginButton.click();
    }
}