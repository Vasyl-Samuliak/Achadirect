// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Redirection to quality certifications page after clicking on "Material Quality Certifications" link',
    async ({ page, isMobile }) => {
        test.slow();
        
        if (isMobile)
            await page.locator('span.nav-toggle').first().click();

        await page.locator('a#ui-id-7').click();
        await page.getByRole('link', { name: 'Material Quality Certifications', exact: true }).click();
        await expect(page).toHaveURL('/material-quality-certifications');
    });