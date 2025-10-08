// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Redirection to reviews page after clicking on "Customer Reviews" link', async ({ page, isMobile }) => {
    test.slow();

    while (!(await page.getByRole('button', { name: 'DECLINE', exact: true }).isVisible())) {
        await page.waitForTimeout(300);
    }
    await page.getByRole('button', { name: 'DECLINE', exact: true }).click();

    if (isMobile) {
        await page.locator('span.nav-toggle').first().click();
        await page.locator('a#ui-id-11').first().scrollIntoViewIfNeeded();
        await page.locator('a#ui-id-11').first().click();

        await page.getByRole('link', { name: 'Customer reviews', exact: true }).scrollIntoViewIfNeeded();
        await page.getByRole('link', { name: 'Customer reviews', exact: true }).click();
    }
    else {
        await page.getByRole('link', { name: 'CUSTOMER REVIEWS', exact: true }).scrollIntoViewIfNeeded();
        await page.getByRole('link', { name: 'CUSTOMER REVIEWS', exact: true }).click();
    }
    await expect(page).toHaveURL('/reviews');
});