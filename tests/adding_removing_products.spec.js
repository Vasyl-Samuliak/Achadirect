import { expect } from '@playwright/test';
import { test } from '../login_account';

test('Adding and removing products', async ({ page, isMobile }) => {
    test.slow();

    await page.waitForLoadState('domcontentloaded');

    await page.locator('a.product-item-link').first().click();
    await page.waitForLoadState('domcontentloaded');

    await page.locator('input#add-to-all').click();
    await page.waitForTimeout(300);
    await page.locator('input#add-to-all').first().pressSequentially('1', { delay: 250 });

    if (isMobile) {
        await page.getByRole('button', { name: 'Add all quantity', exact: true }).first().click();
    }
    else {
        await page.getByRole('button', { name: 'Apply', exact: true }).first().click();
    }

    await page.waitForLoadState('domcontentloaded');
    await page.locator('button.tocart').first().click();
    await expect(page.locator('#confirmBox')).toBeVisible();

    await page.locator('#product-remove-item-button').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#confirmBox')).toBeVisible();
});