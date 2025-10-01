// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Redirection to quality certifications page after clicking on "Material Certifications" link', async ({ page }) => {
    await page.locator('ol.product-items > li.product-item').first().click();

    await expect(page.getByRole('link', {name: "Product Information", exact: true})).toBeVisible();
    await page.getByRole('link', {name: "Material Certifications", exact: true}).click();
    await expect(page).toHaveURL('/material-quality-certifications');
});