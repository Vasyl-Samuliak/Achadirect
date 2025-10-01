// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Check if can click on every category page under the "Products" section', async ({ page }) => {
    const categories = await page.locator('#vertical-menu-top > nav > ul > li.level1').all();

    for(let i = 0; i < categories.length; i++){
        await expect(categories[i]).toBeEnabled();
    }
});