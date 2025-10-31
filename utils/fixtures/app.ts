import { mergeTests } from '@playwright/test';
import { test as fixtureUserGaragePage } from './userGaragePageFixture';
import { test as fixtureHomePage } from './homePageFixture';
import { test as fixtureSignInForm } from './signInFormFixture';

export const test = mergeTests(fixtureUserGaragePage, fixtureHomePage, fixtureSignInForm);
export { expect } from '@playwright/test';
