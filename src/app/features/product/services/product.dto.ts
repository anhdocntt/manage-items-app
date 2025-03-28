export interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  isDeleted?: boolean;
}

export interface CreateUpdateProductBody extends Omit<Product, 'id' | 'isDeleted'> { }