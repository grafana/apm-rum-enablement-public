import http from 'k6/http';
import { check, sleep } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            iterations: 200,
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
    thresholds: {
        checks: ["rate==1.0"]
    }
}

export default async function () {
    const context = browser.newContext();
    const page = context.newPage();

    http.get(`http://frontend:8000`);
    sleep(1);

    try {
        await page.goto(`http://frontend:8000`);
        sleep(1);

        const productsNavItem = page.locator("//a[starts-with(text(),'Products')]")
        await Promise.all([page.waitForNavigation(), productsNavItem.click()]);

        const productToFind = Math.floor(Math.random() * 9) + 1;

        const detailPageButton = page.locator(`#product-list div.product:nth-child(${productToFind}) a.btn`);

        await Promise.all([page.waitForNavigation(), detailPageButton.click()]);
        sleep(1);

        check(page, {
            'header': p => p.locator('h1').textContent() == 'Faros',
        });

        // Product detail page
        page.locator('input[name="add_to_cart[quantity]"]').type(1);
        const addButton = page.locator('button#add_to_cart_add')

        await Promise.all([page.waitForNavigation(), addButton.click()]);
        sleep(1);

        // checkout
        const checkoutButton = page.locator('a#checkout');

        await Promise.all([page.waitForNavigation(), checkoutButton.click()]);
        sleep(1);

        check(page, {
            'header': p => p.locator('h1').textContent() == 'Checkout Succeeded!',
        });

        page.waitForTimeout(5000);
    } finally {
        page.close();
    }
}