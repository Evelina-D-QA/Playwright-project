import test, { expect } from '@playwright/test';
import AuthController from '../api/controllers/AuthController';
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

	test('Successful car creation, model BMW X5 ', async ({ request }) => {
		const newCar = {
			carBrandId: 2,
			carModelId: 8,
			mileage: 333,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Successful car creation, model Porsche Cayenne', async ({ request }) => {
		const newCar = {
			carBrandId: 4,
			carModelId: 17,
			mileage: 400,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Successful car creation, model Fiat Panda', async ({ request }) => {
		const newCar = {
			carBrandId: 5,
			carModelId: 21,
			mileage: 500,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Successful car creation, model Ford Focus', async ({ request }) => {
		const newCar = {
			carBrandId: 3,
			carModelId: 12,
			mileage: 555,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Successful car creation, model Audi Q7', async ({ request }) => {
		const newCar = {
			carBrandId: 1,
			carModelId: 3,
			mileage: 456,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).toBe(201);
		expect(body.data).toMatchObject(newCar);
	});

	test('Creating a car with the wrong brand', async ({ request }) => {
		const newCar = {
			carBrandId: 0,
			carModelId: 3,
			mileage: 876,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).not.toBe(201);
		expect(body.status).toBe('error');
		expect(body.message).toContain('Brand not found');
	});

	test('Creating a car with the wrong model', async ({ request }) => {
		const newCar = {
			carBrandId: 1,
			carModelId: 20,
			mileage: 987,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).not.toBe(201);
		expect(body.status).toBe('error');
		expect(body.message).toContain('Model not found');
	});

	test('Creating a car with the wrong mileage', async ({ request }) => {
		const newCar = {
			carBrandId: 2,
			carModelId: 8,
			mileage: 1111111111,
		};

		const response = await carsController.addCar(newCar, sid);
		const body = await response.json();
		expect(response.status()).not.toBe(201);
		expect(body.status).toBe('error');
		expect(body.message).toContain('Mileage has to be from 0 to 999999');
	});
});
