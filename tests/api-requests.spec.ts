import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import AuthController from '../api/controllers/AccountController';
import CarsController from '../api/controllers/CarsController';
import { testUser1 } from '../test-data/users';

test.describe('API requests', () => {
	let authController: AuthController;
	let carsController: CarsController;

	let sid: string;

	test.beforeAll(async ({ request }) => {
		authController = new AuthController(request);
		const response = await authController.signIn(testUser1.email, testUser1.password);
		sid = response;
	});

	test.beforeEach(async ({ request }) => {
		carsController = new CarsController(request);
	});

	test('Get brands via API', async ({ request }) => {
		const response = await request.get('/api/cars/brands');
		const body = await response.json();
		expect(response.status()).toBe(200);
		expect(body.data).toHaveLength(5);
		console.log(body);
	});

	test('Get models via API', async ({ request }) => {
		const response = await request.get('/api/cars/models');
		const body = await response.json();
		expect(response.status()).toBe(200);
		expect(body.data).toHaveLength(23);
		console.log(body);
	});

	test('Create new car via API', async ({ request }) => {
		const newCar = {
			carBrandId: 1,
			carModelId: 1,
			mileage: 777,
		};

		const response = await carsController.addCar(newCar, sid);

		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Sign in via API and get sid from cookie', async ({ request }) => {
		const response = await request.post('/api/auth/signin', {
			data: {
				email: testUser1.email,
				password: testUser1.password,
				remember: false,
			},
		});

		expect(response.status()).toBe(200);
		const headers = response.headers();
		const setCookieHeader = headers['set-cookie'];

		const sid = setCookieHeader?.split(';')[0];
		expect(sid).toContain('sid=');
	});

	test('Delete car via API', async ({ request }) => {
		// First, create a new car to delete
		const newCar = {
			carBrandId: 1,
			carModelId: 1,
			mileage: 123,
		};
		const createResponse = await carsController.addCar(newCar, sid);

		const createdCar = await createResponse.json();
		expect(createResponse.status()).toBe(201);
		expect(createdCar.data).toMatchObject(newCar);

		// Now delete the car
		const deleteResponse = await carsController.removeCar(createdCar.data.id, sid);

		expect(deleteResponse.status()).toBe(200);
	});
});

test('Sample test', async ({ request }) => {
	const carsController = new CarsController(request);
	let sid: string;

	const response = await request.post('/api/auth/signin', {
		data: {
			email: testUser1.email,
			password: testUser1.password,
			remember: false,
		},
	});

	expect(response.status()).toBe(200);
	const headers = response.headers();
	const setCookieHeader = headers['set-cookie'];
	console.log(await response.json());
	console.log(await response.status());
	sid = setCookieHeader?.split(';')[0];
	expect(sid).toContain('sid=');

	await carsController.removeLastAddedCar(sid);
});
