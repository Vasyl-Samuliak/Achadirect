// @ts-check
require('dotenv').config();
import {test, expect } from '@playwright/test';


test('Login with invalid email format', async ({ page }) => {
    await page.goto('/customer/account/login')

    const email_field = page.locator('input#email').first();
    const password_field = page.locator('input#pass').first();

    await email_field.click();
    // @ts-ignore
    await email_field.fill(process.env.TEST_INVALID_EMAIL_FORMAT);
    
    await password_field.click();
    // @ts-ignore
    await password_field.fill(process.env.TEST_PASSWORD_FOR_INVALID_EMAIL_FORMAT);

    const login_button = page.getByRole('button', {name: 'Login'});
    await login_button.click();

    await expect(page.locator('#email-error')).toBeVisible();
});