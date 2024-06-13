import { Api, ApiListResponse } from './base/api';
import { ILarekApi, IOrder, IOrderResult, IProduct } from '../types';

export class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductById(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	submitOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((result: IOrderResult) => ({
			id: result.id,
			total: result.total,
		}));
	}
}
