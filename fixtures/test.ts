import {test as base} from "@playwright/test"
import {CartPage, CheckoutPage, InventoryPage, LoginPage} from "../pages";


type AppFixtures = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    checkoutPage: CheckoutPage,
    cartPage: CartPage,
}

const test = base.extend<AppFixtures>(
    {
        loginPage: async ({page}, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage);
        },
        inventoryPage: async ({page}, use) => {
            const inventoryPage = new InventoryPage(page);
            await use(inventoryPage);
        },
        checkoutPage: async ({page}, use) => {
            const checkoutPage = new CheckoutPage(page);
            await use(checkoutPage);
        },
        cartPage: async ({page}, use) => {
            const cartPage = new CartPage(page);
            await use(cartPage);
        }
    }
)

export  {expect} from "@playwright/test"