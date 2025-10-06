import { expect } from '@playwright/test';
import { test } from '../login_account';

test('Proceed to checkout', async ({ page, isMobile }) => {
    test.slow();

    await page.waitForLoadState('domcontentloaded');

    await page.locator('a.product-item-link').first().click();
    await page.waitForLoadState('domcontentloaded');

    const price_text = (await page.locator('.price-wrapper').first().innerText()).toString();

    const digit_match = price_text.match(/\d/);
    const firstDigitIndex = digit_match ? digit_match.index : -1;

    const price = parseFloat(price_text.substring(firstDigitIndex));
    const minimum_order_cost = 150;
    const quantity = Math.floor(minimum_order_cost / price) + 1;

    await page.locator('input.add-to-all-input').first().click();
    await page.waitForTimeout(300);
    await page.locator('input.add-to-all-input').first().pressSequentially(quantity.toString(), { delay: 250 });

    if (isMobile) {
        await page.getByRole('button', { name: 'Add all quantity', exact: true }).first().click();
    }
    else {
        await page.getByRole('button', { name: 'Apply', exact: true }).first().click();
    }

    await page.waitForLoadState('domcontentloaded');
    await page.locator('button.tocart').first().click();
    await expect(page.locator('#confirmBox').first()).toBeVisible();

    await page.goto('/checkout/cart/');
    await page.locator('button.checkout').first().click();
    await expect(page).toHaveURL('/checkout/');

    await page.goto('/checkout/cart/');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('a.action-delete-cart-item').first().click();
    await expect(page.locator('div.cart-empty').first()).toBeVisible();
});