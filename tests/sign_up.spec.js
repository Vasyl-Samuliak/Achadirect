// @ts-check
require('dotenv').config();
import { test } from '../navigation_to_site.spec';


test('Sign up', async ({ page }) => {

    test.slow();

    await page.getByRole('link', { name: 'Sign Up', exact: true }).click();
    await page.waitForURL('/customer/account/create/');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('input#firstname').click();
    // @ts-ignore
    await page.locator('input#firstname').pressSequentially(process.env.TEST_FIRSTNAME, { delay: 150 });

    await page.locator('input#lastname').click();
    // @ts-ignore
    await page.locator('input#lastname').pressSequentially(process.env.TEST_LASTNAME, { delay: 150 });


    const default_country = await page.locator('a.option-selected').first().innerText();
    if (default_country !== process.env.TEST_COUNTRY) {
        await page.locator('a.option-selected').first().scrollIntoViewIfNeeded();
        await page.locator('div.ms-dd-header').first().click();

        await page.waitForTimeout(300);

        await page.locator('span.ms-dd-label').filter({ hasText: process.env.TEST_COUNTRY }).first().click();
        await page.waitForLoadState('domcontentloaded');

        await page.waitForTimeout(300);


        await page.locator('#mobile').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.locator('#mobile').click();


        await page.locator('#mobile').clear();
        await page.waitForTimeout(300);

        // @ts-ignore
        await page.locator('#mobile').pressSequentially(process.env.TEST_PHONE_NUMBER, { delay: 250 });
        await page.waitForTimeout(300);


        await page.locator('#wholesale_customer').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.locator('#wholesale_customer').click();

        await page.waitForTimeout(300);

        await page.locator('#email_address').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.locator('#email_address').click();
        // @ts-ignore
        await page.locator('#email_address').pressSequentially(process.env.TEST_EMAIL, { delay: 250 });


        await page.locator('#password').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.locator('#password').click();
        // @ts-ignore
        await page.locator('#password').pressSequentially(process.env.TEST_PASSWORD, { delay: 250 });

        await page.locator('#password-confirmation').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.locator('#password-confirmation').click();
        // @ts-ignore
        await page.locator('#password-confirmation').pressSequentially(process.env.TEST_PASSWORD, { delay: 250 });


        await page.getByRole('button', { name: 'Create an Account', exact: true }).scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await page.getByRole('button', { name: 'Create an Account', exact: true }).click();

        await page.waitForURL('/registration-success');
    }
});