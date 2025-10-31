import { APIRequestContext } from '@playwright/test';

export default class CarsController {
	request: APIRequestContext;
	constructor(request: APIRequestContext) {
		this.request = request;
	}

	async addCar(carData: { carBrandId: number; carModelId: number; mileage: number }, sid: string) {
		const response = await this.request.post('/api/cars', {
			data: carData,
			headers: {
				Cookie: `${sid}`,
			},
		});
		return response;
	}
}
