// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Desktop: Redirection to quality certifications page after clicking on "Material Quality Certifications" link', 
    async ({ page, isMobile }) => {
    test.skip(isMobile);
    await page.locator('#ui-id-7').click();
    await page.getByRole('link', {name: "Material Quality Certifications", exact: true}).click();
    await expect(page).toHaveURL('/material-quality-certifications');
});