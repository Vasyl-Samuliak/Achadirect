// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Redirection to reviews page after clicking on "Customer Reviews" link', async ({ page }) => {
    await page.locator('a.text-white').first().click();
    await expect(page).toHaveURL('/reviews');
});