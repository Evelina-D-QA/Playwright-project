import { Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class GaragePage extends BasePage {
	private readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
	public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
	public readonly lastCarName: Locator = this.page.locator('.car_name').first();

	async navigate() {
		await this.page.goto('/panel/garage', { waitUntil: 'networkidle' });
	}

	async openAddCarForm() {
		await this.addCarButton.click();
	}
}
