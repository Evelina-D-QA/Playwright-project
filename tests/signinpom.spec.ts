import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';

test.describe('POM Sign In tests', () => {
	let homePage: HomePage;
	let signInForm: SignInForm;
	let garagePage: GaragePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		signInForm = new SignInForm(page);
		garagePage = new GaragePage(page);

		await homePage.navigate();
		await homePage.openSignInForm();
	});

	test('Successful sign in', async () => {
		await signInForm.loginWithCredentials('evie.maier.w+1234567@gmail.com', 'Password123');
		await expect(garagePage.pageTitle).toBeVisible();
	});

	test('Sign In without email', async () => {
		await signInForm.triggerErrorOnField(signInForm.emailField);
		await expect(signInForm.errorMessage).toHaveText('Email required');
	});

	test('Sign In without password', async () => {
		await signInForm.triggerErrorOnField(signInForm.passwordField);
		await expect(signInForm.errorMessage).toHaveText('Password required');
	});
});
