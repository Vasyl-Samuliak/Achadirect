import { expect } from '@playwright/test';
import { test } from '../login_account';

test('Access the shopping cart from the icon', async ({ page }) => {

    await page.waitForLoadState('domcontentloaded');

    await page.locator('#minicart-row').first().hover();
    
    const isBlock = await page.locator('div.block-minicart').first().evaluate(
        (el) => window.getComputedStyle(el).display === 'block'
    );
    expect(isBlock).toBe(true);
});