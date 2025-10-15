import { Locator } from '@playwright/test';
import BasePage from '../pages/BasePage';

export default class SignUpForm extends BasePage {
	public readonly nameField: Locator = this.page.locator('//input[@id="signupName"]');
	public readonly lastNameField: Locator = this.page.locator('//input[@id="signupLastName"]');
	public readonly emailField: Locator = this.page.locator('//input[@id="signupEmail"]');
	public readonly passwordField: Locator = this.page.locator('//input[@id="signupPassword"]');
	public readonly repeatPasswordField: Locator = this.page.locator('//input[@id="signupRepeatPassword"]');
	public readonly registerButton: Locator = this.page.locator('//button[@class="btn btn-primary"]');
	public readonly formTitle: Locator = this.page.locator('//h4[@class="modal-title"]');
	public readonly formControlBorder: Locator = this.page.locator(
		'//div[@class="form-group"]//input[contains(@class, "ng-touched")]'
	);
	public readonly formControlRepeatPassword: Locator = this.page.locator('#signupRepeatPassword');
	public readonly formValidateAlert: Locator = this.page.locator('//p[@class="alert alert-danger"]');

	async userRegistration(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
		await this.enterName(name);
		await this.enterLastName(lastName);
		await this.enterEmail(email);
		await this.enterPassword(password);
		await this.enterRepeatPassword(repeatPassword);
	}

	async enterName(name: string) {
		await this.nameField.fill(name);
	}

	async enterLastName(lastName: string) {
		await this.lastNameField.fill(lastName);
	}

	async enterEmail(email: string) {
		await this.emailField.fill(email);
	}

	async enterPassword(password: string) {
		await this.passwordField.fill(password);
	}

	async enterRepeatPassword(repeatPassword: string) {
		await this.repeatPasswordField.fill(repeatPassword);
	}

	async clickRegisterButton() {
		await this.registerButton.click();
	}

	async triggerErrorOnField(field: Locator) {
		await field.focus();
		await field.blur();
	}
}
