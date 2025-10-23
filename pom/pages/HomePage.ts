import { Locator } from '@playwright/test';
import BasePage from './BasePage';
import step from '../utils/stepDecorator';

export default class HomePage extends BasePage {
	private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');

	@step('Navigate to home')
	async navigate() {
		await this.page.goto('/');
	}

	@step('Open Sign Up form')
	async openSignUpForm() {
		await this.signUpButton.click();
	}
}
