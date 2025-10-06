// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

const currencies = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "JPY": "¥",
    "RUB": "RUB",
    "AUD": "A$",
    "CAD": "CA$",
    "NZD": "NZ$",
    "CHF": "CHF",
    "SEK": "SEK",
    "DKK": "DKK",
    "PLN": "PLN",
    "BRL": "R$",
    "MXN": "MX$",
    "ZAR": "R",
    "THB": "THB",
    "ARS": "ARS",
};

test('Changing the currency', async ({ page }) => {
    test.setTimeout(300_000);

    while (!(await page.getByRole('button', { name: 'DECLINE', exact: true }).isVisible())) {
        await page.waitForTimeout(300);
    }
    await page.getByRole('button', { name: 'DECLINE', exact: true }).click();
    await page.waitForLoadState('domcontentloaded');


    const default_currency = page.locator('#switcher-currency-trigger > strong > span:nth-of-type(2)');
    const default_currency_code = (await default_currency.innerText()).split('-')[0].trim();

    const price = await page.locator('span.price').nth(2).innerText();
    // @ts-ignore
    expect(price).toContain(currencies[default_currency_code]);

    const currency_switcher = page.locator('#switcher-currency');
    await currency_switcher.click();
    await page.waitForLoadState('domcontentloaded');

    const currency_text_locator = 'div.switcher-options > ul > li > a > span.currency-text';
    const currencies_text = await currency_switcher.locator(currency_text_locator).allInnerTexts();

    for (let i = 0; i < currencies_text.length; i++) {
        const currency_code = currencies_text[i].split('-')[0].trim();

        const currency_option = page.locator(`li.currency-${currency_code}`).first();
        await currency_option.scrollIntoViewIfNeeded();
        await currency_option.click();


        await page.waitForURL('/');
        await page.waitForTimeout(3000);
        await page.waitForLoadState('domcontentloaded');

        const changed_default_currency = page.locator('#switcher-currency-trigger > strong > span:nth-of-type(2)');
        expect(await changed_default_currency.innerText()).toContain(currency_code);

        // @ts-ignore
        expect(await page.locator('span.price').nth(2).innerText()).toContain(currencies[currency_code]);
        await page.locator('#switcher-currency').first().click();
        await page.waitForLoadState('domcontentloaded');
    }

    const default_currency_option = page.locator(`li.currency-${default_currency_code}`).first();
    await default_currency_option.scrollIntoViewIfNeeded();
    await default_currency_option.click();

    await page.waitForURL('/');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('domcontentloaded');

    // @ts-ignore
    expect(await page.locator('span.price').nth(2).innerText()).toContain(currencies[default_currency_code]);
});