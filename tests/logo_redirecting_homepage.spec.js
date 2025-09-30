// @ts-check

import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';


test('Redirecting to homepage after clicking on logo', async ({ page }) => {
    const site_logo = page.locator('a.logo').first();
    await site_logo.click();
    await expect(page).toHaveURL('/');
});