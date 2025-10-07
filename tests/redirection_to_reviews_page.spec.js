// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Redirection to reviews page after clicking on "Customer Reviews" link', async ({ page }) => {

    while (!(await page.getByRole('button', { name: 'DECLINE', exact: true }).isVisible())) {
        await page.waitForTimeout(300);
    }
    await page.getByRole('button', { name: 'DECLINE', exact: true }).click();

    await page.getByRole('link', { name: 'CUSTOMER REVIEWS', exact: true }).click();
    await expect(page).toHaveURL('/reviews');
});