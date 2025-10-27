import { Locator } from '@playwright/test';
import BasePage from '../pages/BasePage';

export default class SignInForm extends BasePage {
	public readonly emailField: Locator = this.page.locator('//input[@id="signinEmail"]');
	public readonly passwordField: Locator = this.page.locator('//input[@id="signinPassword"]');
	private readonly loginButton: Locator = this.page.locator(
		'//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]'
	);

	async loginWithCredentials(email: string, password: string) {
		await this.enterEmail(email);
		await this.enterPassword(password);
		await this.clickLoginButton();
	}

	async enterEmail(email: string) {
		await this.emailField.fill(email);
	}

	async enterPassword(password: string) {
		await this.passwordField.fill(password);
	}

	async clickLoginButton() {
		await this.loginButton.click();
	}

	async triggerErrorOnField(field: Locator) {
		await field.focus();
		await field.blur();
	}
}
