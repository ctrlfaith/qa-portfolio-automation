const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';

test.describe('Login Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('TC-A-001 | standard_user login with valid credentials should redirect to inventory page', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('TC-A-002 | locked_out_user login should show locked out error message', async ({ page }) => {
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
  });

  test('TC-A-003 | login without credentials should show username required error', async ({ page }) => {
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });

  test('TC-A-004 | login with wrong password should show mismatch error message', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrongpass');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  // BUG-001: username เป็น case-sensitive — Standard_user ควร login ได้แต่ระบบ reject
  test('TC-A-005 | login with uppercase username should be accepted', async ({ page }) => {
    await page.fill('#user-name', 'Standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  });

});