import { Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
	private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');

	async navigate() {
		await this.page.goto('/');
	}

	async openSignUpForm() {
		await this.signUpButton.click();
	}
}
