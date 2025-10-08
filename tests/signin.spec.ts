import { test, expect } from '@playwright/test';

test('Open page', async ({page}) => {
  await page.goto('/');
})