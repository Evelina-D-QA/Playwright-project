import { test as base } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';

type SignInFormFixture = {
	signInForm: SignInForm;
};

export const test = base.extend<SignInFormFixture>({
	signInForm: async ({ page }, use) => {
		const signInForm = new SignInForm(page);
		await use(signInForm);
	},
});

export { expect } from '@playwright/test';
