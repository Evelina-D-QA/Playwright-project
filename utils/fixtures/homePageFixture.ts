import { test as base } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';

type HomePageFixture = {
	homePage: HomePage;
};

export const test = base.extend<HomePageFixture>({
	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page);
		await use(homePage);
	},
});

export { expect } from '@playwright/test';
