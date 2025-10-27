import { Locator } from '@playwright/test';
import BasePage from './BasePage';
import step from '../../utils/stepDecorator';

export default class HomePage extends BasePage {
	private readonly signUpButton: Locator = this.page.locator('//button[contains(@class, "hero-descriptor_btn")]');
	private readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });

	@step('Navigate to home')
	async navigate() {
		await this.page.goto('/');
	}

	@step('Open Sign Up form')
	async openSignUpForm() {
		await this.signUpButton.click();
	}

	@step('Open Sign In form')
	async openSignInForm() {
		// await this.signInButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
		await this.signInButton.click();
	}
}
