import { test, expect } from '@playwright/test';

test('submitting contact form displays inquiry with all details in admin panel', async ({ page }) => {
  // Mock Web3Forms endpoint for fast, deterministic testing
  await page.route('https://api.web3forms.com/submit', route => 
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  );

  // 1. Visit homepage and scroll to contact
  await page.goto('http://localhost:5173/');
  await page.locator('#contact').scrollIntoViewIfNeeded();

  // Fill contact form
  await page.locator('#name').fill('Alexander Wright');
  await page.locator('#email').fill('alex.wright@architecture-studio.com');
  await page.locator('#whatsapp').fill('+44 20 7946 0991');
  await page.locator('#message').fill(
    'Hi Arshdeep, we are looking for a complete overhaul of our digital design system and case study showcase. We would love to review your availability for next month.'
  );

  // Submit form
  const submitBtn = page.locator('button[type="submit"]').filter({ hasText: 'Send Message' });
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();

  // Should navigate to /success
  await expect(page).toHaveURL(/.*\/success/, { timeout: 10000 });
  await expect(page.getByRole('heading', { name: /Thank You/i })).toBeVisible();

  // 2. Open Admin Panel
  await page.goto('http://localhost:5173/admin');

  // If locked, unlock
  const passwordInput = page.locator('input[type="password"]');
  if (await passwordInput.isVisible({ timeout: 1500 }).catch(() => false)) {
    await passwordInput.fill('admin2026!');
    await page.getByRole('button', { name: /Unlock Studio/i }).click();
  }

  // Go to Inquiries tab
  await page.getByRole('button', { name: /Inquiries/i }).click();

  // Verify Alexander Wright's inquiry details
  await expect(page.getByRole('heading', { name: 'Alexander Wright' }).first()).toBeVisible();
  await expect(page.getByText('alex.wright@architecture-studio.com').first()).toBeVisible();
  await expect(page.getByText('+44 20 7946 0991').first()).toBeVisible();
  await expect(page.getByText(/complete overhaul of our digital design system/).first()).toBeVisible();
  await expect(page.getByText(/Portfolio Contact Form/).first()).toBeVisible();
});
