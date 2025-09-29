import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto('https://www.achadirect.com/'); // navigating to site
    await use(page);
  }
});