import http from 'k6/http';
import { check, sleep } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
    vus: 2,
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

    http.get(`http://frontproxy:8000`);
    sleep(1);

    try {
        await page.goto(`http://frontproxy:8000`);
        sleep(1);

        await page.goto(`http://frontproxy:8000/products`);
        sleep(1);

        const productToFind = Math.floor(Math.random() * 9) + 1;
        const productButton = page.locator(`.products button.product:nth-child(${productToFind})`);
        productButton.click();

        sleep(1);

        const reviewOrderButton = page.locator("button.placeOrder");
        await Promise.all([page.waitForNavigation(), reviewOrderButton.click()]);

        await page.goto(`http://frontproxy:8000/order`);
        sleep(1);

        const placeOrderButton = page.locator("button.placeOrder");
        await Promise.all([page.waitForNavigation(), placeOrderButton.click()]);

        sleep(1);
    } finally {
        page.close();
    }
}
