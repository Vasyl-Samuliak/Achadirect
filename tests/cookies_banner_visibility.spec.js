// @ts-check

import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';


test('Checking cookies banner visibility', async ({ page }) => {
    const cookie_banner = page.locator('[data-role="gdpr-cookie-container"]');
    await expect(cookie_banner).toBeVisible();
});