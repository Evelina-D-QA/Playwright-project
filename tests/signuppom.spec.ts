import { test, expect } from '@playwright/test';

import HomePage from '../pom/pages/HomePage';
import SignUpForm from '../pom/forms/SignUpForm';

test.describe('POM Sing Up tests', () => {
	let homePage: HomePage;
	let signUpForm: SignUpForm;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		signUpForm = new SignUpForm(page);

		await homePage.navigate();
		await homePage.openSignUpForm();
	});

	test.describe('Registration button exist and open the form', () => {
		test('Open registration form', async () => {
			await expect(signUpForm.formTitle).toHaveText('Registration');
		});
	});

	test.describe('Testing the "Name" field', () => {
		test('Error if field Name is empty', async () => {
			await signUpForm.triggerErrorOnField(signUpForm.nameField);
			await expect(signUpForm.errorMessage).toHaveText('Name required');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Correct name - field is valid', async () => {
			await signUpForm.enterName('Evelina');
			await signUpForm.nameField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		test('Name with a space - field is valid', async () => {
			await signUpForm.enterName(' Evelina ');
			await signUpForm.nameField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		test('Error if the name is wrong', async () => {
			await signUpForm.enterName('8765!@#$%');
			await signUpForm.nameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the Name length is wrong, less than 2', async () => {
			await signUpForm.enterName('E');
			await signUpForm.nameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the Name length is wrong, more than 20', async () => {
			await signUpForm.enterName('Eyuiopnbtfgdjnbgfhdkd');
			await signUpForm.nameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Name has to be from 2 to 20 characters long');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the name is not in English', async () => {
			await signUpForm.enterName('Эвелина');
			await signUpForm.nameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Name is invalid');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});
	});

	test.describe('Testing the "Last name" field', () => {
		test('Error if field Last name is empty', async () => {
			await signUpForm.triggerErrorOnField(signUpForm.lastNameField);
			await expect(signUpForm.errorMessage).toHaveText('Last name required');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Correct name - field is valid', async () => {
			await signUpForm.enterLastName('Maier');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		test('Last name with a space - field is valid', async () => {
			await signUpForm.enterLastName(' Maier ');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		test('Error if the Last name is wrong', async () => {
			await signUpForm.enterLastName('8765!@#$%');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the Last name length is wrong, less than 2', async () => {
			await signUpForm.enterLastName('E');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the Last name length is wrong, more than 20', async () => {
			await signUpForm.enterLastName('Myuiopnbtfgdjnbgfhdkd');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Error if the Last name is not in English', async () => {
			await signUpForm.enterLastName('Майер');
			await signUpForm.lastNameField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Last name is invalid');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});
	});

	test.describe('Testing the "Email" field', () => {
		test('Error if field email is empty', async () => {
			await signUpForm.triggerErrorOnField(signUpForm.emailField);
			await expect(signUpForm.errorMessage).toHaveText('Email required');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Correct Email - field is valid', async () => {
			await signUpForm.enterEmail('test@gmail.com');
			await signUpForm.emailField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		const incorrectEmails = [
			'userexample.com',
			'user@',
			'@example.com',
			'user@example',
			'user@.com',
			'user@domain..com',
			'user@domain,com',
			'.user@domain.com',
			'user@-domain.com',
			'user@domain!com',
			'us#er@domain.com',
		];
		incorrectEmails.forEach((value) => {
			test(`Shows error for incorrect email: ${value}`, async () => {
				await signUpForm.enterEmail(value);
				await signUpForm.emailField.blur();
				await expect(signUpForm.errorMessage).toHaveText('Email is incorrect');
				await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
			});
		});
	});

	test.describe('Testing the "Password" field', () => {
		test('Error if field Password is empty', async () => {
			await signUpForm.triggerErrorOnField(signUpForm.passwordField);
			await expect(signUpForm.errorMessage).toHaveText('Password required');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('Correct Password - field is valid', async () => {
			await signUpForm.enterPassword('Password123');
			await signUpForm.passwordField.blur();
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		const incorrectPasswords = [
			'password',
			'PASSWORD',
			'12345678',
			'passwor1',
			'PASSWOR1',
			'Password',
			'Pa1',
			'Password1Password2',
		];
		incorrectPasswords.forEach((value) => {
			test(`Shows error for incorrect password: ${value}`, async () => {
				await signUpForm.enterPassword(value);
				await signUpForm.passwordField.blur();
				await expect(signUpForm.errorMessage).toHaveText(
					'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
				);
				await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
			});
		});
	});

	test.describe('Testing the "Re-enter password" field', () => {
		test('Error if field Re-enter password is empty', async () => {
			await signUpForm.triggerErrorOnField(signUpForm.repeatPasswordField);
			await expect(signUpForm.errorMessage).toHaveText('Re-enter password required');
			await expect(signUpForm.formControlBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});

		test('The passwords match - fields are valid', async () => {
			await signUpForm.enterPassword('Password123');
			await signUpForm.enterRepeatPassword('Password123');
			await signUpForm.repeatPasswordField.blur();
			await expect(signUpForm.formControlRepeatPassword).toHaveCSS('border-color', 'rgb(206, 212, 218)');
		});

		test('Error if password do not match', async () => {
			await signUpForm.enterPassword('Password123');
			await signUpForm.enterRepeatPassword('Password125');
			await signUpForm.repeatPasswordField.blur();
			await expect(signUpForm.errorMessage).toHaveText('Passwords do not match');
			await expect(signUpForm.formControlRepeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
		});
	});

	test.describe('User registration', () => {
		const date = new Date();
		const uniqueEmail = `evie.maier.w+${date.getDate()}${date.getHours()}@gmail.com`;

		test('The Register button is disabled if data incorrect', async () => {
			await signUpForm.userRegistration('Evelina', 'Maier', '123', 'Password123', 'Password123');
			await expect(signUpForm.registerButton).toBeDisabled();
		});

		test('Successful registration, user created', async ({ page }) => {
			await signUpForm.userRegistration('Evelina', 'Maier', uniqueEmail, 'Password123', 'Password123');
			await signUpForm.clickRegisterButton();
			await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
		});

		test('Error if user re-registers', async ({ page }) => {
			await signUpForm.userRegistration('Evelina', 'Maier', uniqueEmail, 'Password123', 'Password123');
			await signUpForm.clickRegisterButton();
			await expect(signUpForm.formValidateAlert).toHaveText('User already exists');
		});
	});
});
