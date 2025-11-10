import { test, expect } from '@playwright/test';

test.describe('Testing the registration form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test.describe('Registration button exist and open the form', () => {

    test('Open registration form', async ({ page }) => {
      await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
      await expect(page.locator('//h4[@class="modal-title"]')).toHaveText('Registration');
    })
    
    test('The registration form is opened via the button Sign In', async ({page}) => {
      await page.locator('//button[contains(@class, "header_signin")]').click();
      await page.getByRole('button', { name: 'Registration' }).click();
      await expect(page.locator('//h4[@class="modal-title"]')).toHaveCount(1);
      await expect(page.locator('//h4[@class="modal-title"]')).toHaveText('Registration');
    })
  })

  test.describe('Testing the "Name" field', () => {
    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    test('Error if field Name is empty', async ({page}) => {
    await page.locator('//input[@id="signupName"]').clear();
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Name required');
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Correct name - field is valid', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('Evelina');
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    })

    // test('Name with a space - field is valid', async ({page}) => {
    // await page.locator('//input[@id="signupName"]').fill(' Evelina ');
    // await page.locator('//input[@id="signupName"]').blur();
    // await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    // })

    test('Error if the name is wrong', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('8765!@#$%');
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the Name length is wrong, less than 2', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('E');
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the Name length is wrong, more than 20', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('Eyuiopnbtfgdjnbgfhdkd');
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Name has to be from 2 to 20 characters long');
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the name is not in English', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('Эвелина');
    await page.locator('//input[@id="signupName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Name is invalid');
    await expect(page.locator('//input[@id="signupName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
  })
  test.describe('Testing the "Last name" field', () => {
    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    test('Error if field Last name is empty', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').clear();
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Last name required');
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Correct name - field is valid', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').fill('Maier');
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    })

    // test('Last name with a space - field is valid', async ({page}) => {
    // await page.locator('//input[@id="signupLastName"]').fill(' Maier ');
    // await page.locator('//input[@id="signupLastName"]').blur();
    // await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    // })

    test('Error if the Last name is wrong', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').fill('8765!@#$%');
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the Last name length is wrong, less than 2', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').fill('E');
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the Last name length is wrong, more than 20', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').fill('Myuiopnbtfgdjnbgfhdkd');
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Error if the Last name is not in English', async ({page}) => {
    await page.locator('//input[@id="signupLastName"]').fill('Майер');
    await page.locator('//input[@id="signupLastName"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Last name is invalid');
    await expect(page.locator('//input[@id="signupLastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
  })

  test.describe('Testing the "Email" field', () => {

    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    test('Error if field email is empty', async ({page}) => {
    await page.locator('//input[@id="signupEmail"]').clear();
    await page.locator('//input[@id="signupEmail"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
    await expect(page.locator('//input[@id="signupEmail"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Correct Email - field is valid', async ({page}) => {
    await page.locator('//input[@id="signupEmail"]').fill('test@gmail.com');
    await page.locator('//input[@id="signupEmail"]').blur();
    await expect(page.locator('//input[@id="signupEmail"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    })

    test('Error if the Email is wrong', async ({page}) => {
    await page.locator('//input[@id="signupEmail"]').fill('987))имаил@gmail.com');
    await page.locator('//input[@id="signupEmail"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email is incorrect');
    await expect(page.locator('//input[@id="signupEmail"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
  })

  test.describe('Testing the "Password" field', () => {

    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    test('Error if field Password is empty', async ({page}) => {
    await page.locator('//input[@id="signupPassword"]').clear();
    await page.locator('//input[@id="signupPassword"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
    await expect(page.locator('//input[@id="signupPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('Correct Password - field is valid', async ({page}) => {
    await page.locator('//input[@id="signupPassword"]').fill('Password123');
    await page.locator('//input[@id="signupPassword"]').blur();
    await expect(page.locator('//input[@id="signupPassword"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    })

    const incorrectPasswords = ['password', 'PASSWORD', '12345678', 'passwor1', 'PASSWOR1', 'Password', 'Pa1', 'Password1Password2'];
    incorrectPasswords.forEach((value) => {
      test(`Shows error for incorrect password: ${value}`, async ({page}) => {
      await page.locator('//input[@id="signupPassword"]').fill(value);
      await page.locator('//input[@id="signupPassword"]').blur();
      await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      await expect(page.locator('//input[@id="signupPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      })
    })
  })

  test.describe('Testing the "Re-enter password" field', () => {

    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    test('Error if field Re-enter password is empty', async ({page}) => {
    await page.locator('//input[@id="signupRepeatPassword"]').clear();
    await page.locator('//input[@id="signupRepeatPassword"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Re-enter password required');
    await expect(page.locator('//input[@id="signupRepeatPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })

    test('The passwords match - fields are valid', async ({page}) => {
    await page.locator('//input[@id="signupPassword"]').fill('Password123');
    await page.locator('//input[@id="signupRepeatPassword"]').fill('Password123');
    await page.locator('//input[@id="signupRepeatPassword"]').blur();
    await expect(page.locator('//input[@id="signupRepeatPassword"]')).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    })

    test('Error if password do not match', async ({page}) => {
    await page.locator('//input[@id="signupPassword"]').fill('Password123');
    await page.locator('//input[@id="signupRepeatPassword"]').fill('Password125');
    await page.locator('//input[@id="signupRepeatPassword"]').blur();
    await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Passwords do not match');
    await expect(page.locator('//input[@id="signupRepeatPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    })
  })

  test.describe('User registration', () => {

    test.beforeEach(async ({ page }) => {
    await page.locator('//button[contains(@class, "hero-descriptor_btn")]').click();
    })

    const date = new Date();
    const uniqueEmail = `evie.maier.w+${date.getDate()}${date.getHours()}@gmail.com`;

    test('The Register button is disabled if data incorrect', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('Evelina');
    await page.locator('//input[@id="signupLastName"]').fill('Maier');
    await page.locator('//input[@id="signupEmail"]').fill('123');
    await page.locator('//input[@id="signupPassword"]').fill('Password123');
    await page.locator('//input[@id="signupRepeatPassword"]').fill('Password123');
    await expect(page.locator('//button[@class="btn btn-primary"]')).toBeDisabled();
    })

    // test('The Register button works and the user is created', async ({page}) => {
    // await page.locator('//input[@id="signupName"]').fill('Evelina');
    // await page.locator('//input[@id="signupLastName"]').fill('Maier');
    // await page.locator('//input[@id="signupEmail"]').fill(uniqueEmail);
    // await page.locator('//input[@id="signupPassword"]').fill('Password123');
    // await page.locator('//input[@id="signupRepeatPassword"]').fill('Password123');
    // await page.locator('//button[@class="btn btn-primary"]').click();
    // await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    // })

    test('Error if user re-registers', async ({page}) => {
    await page.locator('//input[@id="signupName"]').fill('Evelina');
    await page.locator('//input[@id="signupLastName"]').fill('Maier');
    await page.locator('//input[@id="signupEmail"]').fill(uniqueEmail);
    await page.locator('//input[@id="signupPassword"]').fill('Password123');
    await page.locator('//input[@id="signupRepeatPassword"]').fill('Password123');
    await page.locator('//button[@class="btn btn-primary"]').click();
    await expect(page.locator('//p[@class="alert alert-danger"]')).toHaveText('User already exists');
    })
  })
})


