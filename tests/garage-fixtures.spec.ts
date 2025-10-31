import { test, expect } from '../utils/fixtures/userGaragePageFixture';
// import SignInForm from '../pom/forms/SignInForm';
// import HomePage from '../pom/pages/HomePage';
// import GaragePage from '../pom/pages/GaragePage';
// import AddCarForm from '../pom/forms/AddCarForm';

// test.use({ storageState: '.auth/testUser1.json' });

test.describe('POM Garage Page tests', () => {
	// let homePage: HomePage;
	// let signInForm: SignInForm;
	// let garagePage: GaragePage;
	// let addCarForm: AddCarForm;

	// test.beforeEach(async ({ page }) => {
	//     // homePage = new HomePage(page);
	//     // signInForm = new SignInForm(page);
	//     // garagePage = new GaragePage(page);
	//     // addCarForm = new AddCarForm(page);

	//     // await homePage.navigate();
	//     // await homePage.openSignInForm();
	//     // await signInForm.loginWithCredentials('evie.maier.w+1234567@gmail.com', 'Password123');
	//     // await expect(garagePage.pageTitle).toBeVisible();
	//     // await garagePage.navigate();
	//     // await garagePage.openAddCarForm();
	// });

	test('Add Porsche 911', async ({ addCarForm, garagePage }) => {
		await addCarForm.addCar('Porsche', '911', '999');
		await expect(garagePage.lastCarName).toHaveText('Porsche 911');
	});

	test('Add BMW X5', async ({ addCarForm, garagePage }) => {
		await addCarForm.addCar('BMW', 'X5', '555');
		await expect(garagePage.lastCarName).toHaveText('BMW X5');
	});

	test('Add Ford Fusion', async ({ addCarForm, garagePage }) => {
		await addCarForm.addCar('Ford', 'Fusion', '333');
		await expect(garagePage.lastCarName).toHaveText('Ford Fusion');
	});
});
