import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://plausible.io/plausible.io');
});

test.describe('Plausible Home Page', () => {
  test('has Plausible in the title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Plausible/);
  });

  test('opens Filters when clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.locator('[role=menu]')).toBeVisible();
  });

  test('Source filter opens Filter by Source modal', async ({ page }) => {
    await page.getByRole('button', { name: 'Filter' }).click();
    await page.locator('a[href="/plausible.io/filter/source"]').click();
    await expect(page.getByText('Filter by Source')).toBeVisible();
  });

  test.describe('Regions section', () => {
    test('clicking on Regions button shows Region and Visitors', async ({ page }) => {
      await page.getByRole('button', { name: 'Regions' }).click();
      await expect(page.getByText('RegionVisitors')).toBeVisible();
    });

    test('clicking on countries Details link shows Top regions', async ({ page }) => {
      await page.getByText('Locations').scrollIntoViewIfNeeded();
      await page.locator('a[href="/plausible.io/countries"]').click();
      await expect(page.getByRole('heading', { name: 'Top countries' })).toBeVisible();
    });
  });
});
