export class Product {
  id: number;
  productName?: string;
  productDescription?: string;
  unitPrice?: number;
  unitsInStock?: number;
  categoryId?: number;
  createdDate: Date;
  modifiedDate: Date;
  discontinued: boolean;
  category: null;
}
