import { expect } from '@playwright/test';
import { test } from '../login_account';

test('Access the shopping cart from the icon', async ({ page }) => {

    await page.waitForLoadState('domcontentloaded');

    await page.locator('a > span.text').first().click();
    await expect(page).toHaveURL('/checkout/cart/');
});