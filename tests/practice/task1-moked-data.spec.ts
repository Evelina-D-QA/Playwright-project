import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/testUser1.json' });

test('Fake user data', async ({ page }) => {
	await page.route('**/api/users/profile', async (route) => {
		const fakeUserData = {
			status: 'ok',
			data: {
				userId: 999999,
				photoFilename: 'default-user.png',
				name: 'Fake',
				lastName: 'User',
			},
		};
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify(fakeUserData),
		});
	});

	await page.goto('/panel/profile');
	await expect(page.locator('//p[@class="profile_name display-4"]')).toHaveText('Fake User');
});
