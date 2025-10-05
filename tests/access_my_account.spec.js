import { expect } from '@playwright/test';
import { test } from '../login_account';

test('Access my account', async ({ page }) => {

    test.slow();
    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('link', { name: 'My Account', exact: true }).click();
    await expect(page).toHaveURL('/customer/account/');
});