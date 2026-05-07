const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';

const loginAs = async (page, username) => {
  await page.goto(BASE_URL);
  await page.fill('#user-name', username);
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
};

test.describe('Sorting Feature', () => {

  test('TC-A-012 | standard_user sort by Name A to Z should display products in ascending order', async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    const names = await page.locator('.inventory_item_name').allTextContents();
    expect(names).toEqual([...names].sort());
  });

  test('TC-A-013 | standard_user sort by Price low to high should display products in ascending price order', async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = (await page.locator('.inventory_item_price').allTextContents())
      .map(p => parseFloat(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  // BUG-005: problem_user — sort dropdown ไม่ทำงาน
  test('TC-A-014 | problem_user sort by Name Z to A should change product order', async ({ page }) => {
    await loginAs(page, 'problem_user');
    const before = await page.locator('.inventory_item_name').allTextContents();
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const after = await page.locator('.inventory_item_name').allTextContents();
    expect(after).not.toEqual(before);
  });

  test('TC-A-015 | performance_glitch_user sort by Name A to Z should display products in ascending order', async ({ page }) => {
    await loginAs(page, 'performance_glitch_user');
    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    const names = await page.locator('.inventory_item_name').allTextContents();
    expect(names).toEqual([...names].sort());
  });

  // BUG-010: error_user — sort แล้วขึ้น popup error แทนที่จะ sort
  test('TC-A-016 | error_user sort by Name Z to A should not show error popup', async ({ page }) => {
    await loginAs(page, 'error_user');

    let dialogShown = false;
    page.on('dialog', async dialog => {
      dialogShown = true;
      await dialog.dismiss();
    });

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await page.waitForLoadState('networkidle');
    expect(dialogShown).toBe(false);
  });

  // BUG-013: visual_user — ราคาสินค้าแสดงผิดและเรียงไม่ถูกต้อง
  test('TC-A-017 | visual_user sort by Price low to high should display prices in ascending order', async ({ page }) => {
    await loginAs(page, 'visual_user');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = (await page.locator('.inventory_item_price').allTextContents())
      .map(p => parseFloat(p.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  // BUG-012: visual_user — รูปการ์ดแรกแสดงผิด (sl-404) ไม่ว่าจะ sort option ใด
  test('TC-A-018 | visual_user first product image should not be a broken or mismatched image', async ({ page }) => {
    await loginAs(page, 'visual_user');
    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    const firstImg = await page.locator('.inventory_item img').first().getAttribute('src');
    expect(firstImg).toContain('sauce-pullover-hoodie');
  });

});