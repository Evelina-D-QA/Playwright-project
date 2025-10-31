import { test, expect } from '../utils/fixtures/app';

test.describe('Intercept & Mock tests', () => {
	test('interception test', async ({ page }) => {
		page.on('request', (request) => console.log('>>', request.method(), request.url()));
		page.on('response', (response) => console.log('<<', response.status(), response.url()));

		await page.goto('/');
	});

	test('interception with mocking - fake cars response', async ({ page, garagePage }) => {
		const fakeCars = {
			status: 'ok',
			data: [
				{
					id: 426597,
					carBrandId: 3,
					carModelId: 11,
					initialMileage: 42,
					updatedMileageAt: '2025-10-24T16:33:00.000Z',
					carCreatedAt: '2025-10-24T16:33:00.000Z',
					mileage: 42,
					brand: 'Ford',
					model: 'Fiesta',
					logo: 'ford.png',
				},
				{
					id: 426596,
					carBrandId: 1,
					carModelId: 1,
					initialMileage: 43,
					updatedMileageAt: '2025-10-24T16:32:56.000Z',
					carCreatedAt: '2025-10-24T16:32:56.000Z',
					mileage: 43,
					brand: 'Audi',
					model: 'TT',
					logo: 'audi.png',
				},
				{
					id: 426595,
					carBrandId: 1,
					carModelId: 1,
					initialMileage: 432,
					updatedMileageAt: '2025-10-24T16:32:54.000Z',
					carCreatedAt: '2025-10-24T16:32:54.000Z',
					mileage: 432,
					brand: 'Audi',
					model: 'TT',
					logo: 'audi.png',
				},
			],
		};

		await page.route('**/cars', (route) => {
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(fakeCars),
			});
		});
		await garagePage.navigate();
		await expect(garagePage.pageTitle).toBeVisible();
		const carItems = page.locator('.car_name');
		await expect(carItems).toHaveCount(3);
	});
});
