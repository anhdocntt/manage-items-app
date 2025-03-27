export interface Product {
  id: string;
  name: string;
  type: string;
  category: number;
  price: number;
  image: string;
  isDeleted?: boolean;
}

export interface CreateUpdateProductBody extends Omit<Product, 'id' | 'isDeleted'> { }