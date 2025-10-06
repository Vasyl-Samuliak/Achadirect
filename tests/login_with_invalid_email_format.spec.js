// @ts-check
require('dotenv').config();
import { test, expect } from '@playwright/test';


test('Login with invalid email format', async ({ page }) => {
    test.slow();

    await page.goto('/customer/account/login')

    while (!(await page.getByRole('button', { name: 'DECLINE', exact: true }).isVisible())) {
        await page.waitForTimeout(300);
    }

    await page.getByRole('button', { name: 'DECLINE', exact: true }).click();

    const email_field = page.locator('input#email').first();
    const password_field = page.locator('input#pass').first();

    await email_field.click();
    // @ts-ignore
    await email_field.fill(process.env.TEST_INVALID_EMAIL_FORMAT);

    await password_field.click();
    // @ts-ignore
    await password_field.fill(process.env.TEST_PASSWORD_FOR_INVALID_EMAIL_FORMAT);

    const login_button = page.getByRole('button', { name: 'Login' });
    await login_button.click();

    await expect(page.locator('#email-error')).toBeVisible();
});