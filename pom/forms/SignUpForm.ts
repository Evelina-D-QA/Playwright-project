import { Locator } from '@playwright/test';
import BasePage from '../pages/BasePage';
import step from '../../utils/stepDecorator';

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


	@step('Register user')
	async userRegistration(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
		await this.enterName(name);
		await this.enterLastName(lastName);
		await this.enterEmail(email);
		await this.enterPassword(password);
		await this.enterRepeatPassword(repeatPassword);
	}

	@step('Enter Name')
	async enterName(name: string) {
		await this.nameField.fill(name);
	}

	@step('Enter Last Name')
	async enterLastName(lastName: string) {
		await this.lastNameField.fill(lastName);
	}

	@step('Enter Email')
	async enterEmail(email: string) {
		await this.emailField.fill(email);
	}

	@step('Enter Password')
	async enterPassword(password: string) {
		await this.passwordField.fill(password);
	}

	@step('Enter Repeat Password')
	async enterRepeatPassword(repeatPassword: string) {
		await this.repeatPasswordField.fill(repeatPassword);
	}

	@step('Click Register')
	async clickRegisterButton() {
		await this.registerButton.click();
	}

	async triggerErrorOnField(field: Locator) {
		await field.focus();
		await field.blur();
	}
}
