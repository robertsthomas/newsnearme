import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/?location=Arizona');
});

test.describe('Homepage', () => {
  test('should render home page', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'News Near Me' })
    ).toBeVisible();
  });

  test('should render article cards', async ({ page }) => {
    await page.waitForLoadState();

    const articles = await page.getByRole('link').all();
    expect(articles.length).toBeGreaterThan(0);
  });

  test('should change location on search select', async ({ page }) => {
    await page.waitForLoadState();
    await page.getByRole('combobox').click();

    const items = await page.getByRole('option').all();
    await items[7].click();

    await expect(page.getByRole('combobox')).toHaveText('Delaware');
    await page.waitForURL('http://localhost:3000/?location=Delaware', {
      waitUntil: 'domcontentloaded',
    });

    expect(page.url()).toContain('Delaware');
  });

  test('should navigate to artice page', async ({ page }) => {
    await page.waitForLoadState();

    const article = page.getByRole('link');
    await article.nth(0).click();
    await page.waitForURL('**/articles/**', {
      waitUntil: 'domcontentloaded',
    });
  });

  test('should navigate to source site', async ({ page }) => {
    await page.waitForLoadState();
    const article = page.getByRole('link');
    await article.nth(0).click();
    await page.waitForURL('**/articles/**', {
      waitUntil: 'domcontentloaded',
    });

    const source = page.getByRole('link');
    await source.click();
    await page.waitForLoadState();
    expect(page).not.toHaveURL('**/articles/**');
  });
});
