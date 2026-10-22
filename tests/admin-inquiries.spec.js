import { test, expect } from '@playwright/test';

test('admin inquiries displays all details, status change, and modal', async ({ page }) => {
  // Pre-seed an inquiry in localStorage
  await page.goto('http://localhost:5173/admin');
  await page.evaluate(() => {
    const mockInquiry = {
      id: 'inq_test_123456',
      name: 'Eleanor Vance',
      email: 'eleanor.vance@hillhouse.design',
      phone: '+1 (555) 987-6543',
      whatsapp: '+1 (555) 987-6543',
      subject: 'New Portfolio Inquiry from Eleanor Vance',
      source: 'Portfolio Contact Form',
      status: 'new',
      message: 'Hello Arshdeep! We love your minimal editorial design style and would like to collaborate on an international brand identity and web design project for Q4.\n\nLooking forward to speaking with you!',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('arsh_portfolio_messages', JSON.stringify([mockInquiry]));
    sessionStorage.setItem('arsh_admin_token', 'master_' + btoa('admin2026!'));
    localStorage.setItem('arsh_admin_auth', 'true');
  });

  // Reload page to enter admin dashboard
  await page.reload();

  // If locked, fill password and unlock
  const passwordInput = page.locator('input[type="password"]');
  if (await passwordInput.isVisible({ timeout: 1500 }).catch(() => false)) {
    await passwordInput.fill('admin2026!');
    await page.getByRole('button', { name: /Unlock Studio/i }).click();
  }

  // Switch to Inquiries tab
  const inquiriesTabBtn = page.getByRole('button', { name: /Inquiries/i });
  await expect(inquiriesTabBtn).toBeVisible();
  await inquiriesTabBtn.click();

  // Verify Metrics Bar
  await expect(page.getByText('Total Inquiries')).toBeVisible();
  await expect(page.getByText('New / Unread')).toBeVisible();

  // Verify Inquiry Card displays all details
  await expect(page.getByRole('heading', { name: 'Eleanor Vance' })).toBeVisible();
  await expect(page.getByText('eleanor.vance@hillhouse.design')).toBeVisible();
  await expect(page.getByText('+1 (555) 987-6543')).toBeVisible();
  await expect(page.getByText('Subject: New Portfolio Inquiry from Eleanor Vance')).toBeVisible();
  await expect(page.getByText('Channel: Portfolio Contact Form').first()).toBeVisible();
  await expect(page.getByText(/We love your minimal editorial design style/)).toBeVisible();
  await expect(page.getByText(/words •/).first()).toBeVisible();

  // Verify View Full Details Modal
  const viewDetailsBtn = page.getByRole('button', { name: /View Full Details/i }).first();
  await expect(viewDetailsBtn).toBeVisible();
  await viewDetailsBtn.click();

  // Verify Modal contents
  await expect(page.locator('h2', { hasText: 'Eleanor Vance' })).toBeVisible();
  await expect(page.getByText('Client & Message Metadata')).toBeVisible();
  await expect(page.getByText('Full Inquiry Message')).toBeVisible();
  await expect(page.getByText('Close')).toBeVisible();

  // Test updating status in modal to "In Review"
  const modalContainer = page.locator('.fixed.inset-0.z-50');
  const inReviewBtn = modalContainer.getByRole('button', { name: 'In Review' });
  await inReviewBtn.click();

  // Close modal
  await modalContainer.getByText('Close').click();
});
