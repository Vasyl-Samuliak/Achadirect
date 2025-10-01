// @ts-check
import { expect } from '@playwright/test';
import { test } from '../navigation_to_site.spec';

test('Changing the currency', async ({ page }) => {
    test.setTimeout(0);
    const default_currency = page.locator('#switcher-currency-trigger > strong > span:nth-of-type(2)');
    const default_currency_symbol = (await default_currency.innerText()).split('-')[1].trim();

    const price = await page.locator('span.price').first().innerText();
    expect(price).toContain(default_currency_symbol);

    const currency_switcher = page.locator('#switcher-currency');
    await currency_switcher.click();

    const currency_text_locator = 'div.switcher-options > ul > li > a > span.currency-text';
    const currencies_text = await currency_switcher.locator(currency_text_locator).allInnerTexts();

    for (let i = 0; i < currencies_text.length; i++) {
        const currency_code = currencies_text[i].split('-')[0].trim();

        const currency_option = page.locator(`li.currency-${currency_code}`).first();
        await currency_option.scrollIntoViewIfNeeded();
        await currency_option.click();

        await page.waitForURL('/');
        await page.waitForTimeout(1000);
        
        const currency_symbol = currencies_text[i].split('-')[1].trim();
        const price = await page.locator('span.price').first().innerText();
        expect(price).toContain(currency_symbol);
        await currency_switcher.click();
    }
});