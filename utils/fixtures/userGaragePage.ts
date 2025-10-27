import { test as base, Page } from '@playwright/test';
base.use({ storageState: '.auth/testUser1.json' });
import GaragePage from '../../pom/pages/GaragePage';
import AddCarForm from '../../pom/forms/AddCarForm';

type userGaragePageFixtures = {
	garagePage: GaragePage;
	addCarForm: AddCarForm;
};

export const test = base.extend<userGaragePageFixtures>({
	garagePage: async ({ page }, use) => {
		const garagePage = new GaragePage(page);
		await garagePage.navigate();
		await garagePage.openAddCarForm();
		await use(garagePage);
	},
	addCarForm: async ({ page }, use) => {
		const addCarForm = new AddCarForm(page);
		await use(addCarForm);
	},
});

export { expect } from '@playwright/test';
