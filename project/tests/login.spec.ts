import {test, expect} from '../fixtures/test';
import {custromer, lockedUser, standardUser} from "../data/Users";


test.describe("Login", async () => {

    test("standard user login", async ({loginPage, page}) => {
        await loginPage.login(standardUser)
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("failed user login", async ({loginPage}) => {
        await loginPage.login(lockedUser)
        await expect(loginPage.errorMessage).toBeVisible()
    })

    test("login without password", async ({loginPage}) => {
        await loginPage.username.fill(standardUser.username)
        await loginPage.loginButton.click()
        await expect(loginPage.errorMessage).toBeVisible()
    })

    test("successfully purchase ",
        async ({loginPage, inventoryPage, cartPage}) => {
            const productName = "Sauce Labs Bike Light";
            await loginPage.login(standardUser)
            await inventoryPage.addProductToCart(productName)
            const badgeCounter = await inventoryPage.getCartBadge().innerText();
            expect(badgeCounter).toBe("1")
            await inventoryPage.openCart()
            const product = cartPage.getProducts(productName);
            await expect(product).toBeVisible()
        })

    test("smoke",
        async ({page, loginPage, inventoryPage, cartPage, checkoutPage}) => {
            const products = ["Sauce Labs Bolt T-Shirt", "Sauce Labs Onesie"];
            await test.step("Login", async () => {
                await loginPage.login(standardUser)
            })

            await test.step("add products", async () => {
                for (const product of products) {
                    await inventoryPage.addProductToCart(product)
                }
            })

            await test.step("check badge counter", async () => {
                const badgeCounter = await inventoryPage.getCartBadge().innerText();
                expect(Number(badgeCounter)).toBe(products.length)
            });

            await test.step("check selected product is visible", async () => {
                await inventoryPage.openCart()
                for (const product of products) {
                    const result = cartPage.getProducts(product);
                    await expect(result).toBeVisible()
                }
            })

            await cartPage.checkout()
            await checkoutPage.fillCustomerInfo(custromer)
            await checkoutPage.continue()
            await checkoutPage.finish()
            await expect(page.getByRole("heading",
                {name: "Thank you for your order!"})).toBeVisible()
        })

})
