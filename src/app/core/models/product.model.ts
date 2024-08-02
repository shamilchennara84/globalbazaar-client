export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  vendorId?: string;
  image?: string;
}

export interface IProductResponse {
  success: boolean;
  message: string;
  products: IProduct[];
}