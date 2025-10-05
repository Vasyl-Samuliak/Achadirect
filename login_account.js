require('dotenv').config();
import { test as base } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        test.slow();
        await page.goto('/customer/account/login/');

        while(!(await page.getByRole('button', { name: 'DECLINE', exact: true }).isVisible())){
            await page.waitForTimeout(300);
        }
        await page.getByRole('button', { name: 'DECLINE', exact: true }).click();
        await page.waitForTimeout(300);

        await page.locator('#email').click();
        await page.locator('#email').pressSequentially(process.env.TEST_LOGIN_EMAIL, { delay: 250 });
        await page.waitForTimeout(300);

        await page.locator('input[type="password"]').first().click();
        await page.locator('input[type="password"]').first().pressSequentially(process.env.TEST_LOGIN_PASSWORD, { delay: 250 });
        await page.waitForTimeout(300);
        
        await page.getByRole('button', { name: 'Login', exact: true }).focus();
        await page.waitForTimeout(300);

        await page.getByRole('button', { name: 'Login', exact: true }).click();
        await page.waitForURL('/');
        await use(page);
    }
});