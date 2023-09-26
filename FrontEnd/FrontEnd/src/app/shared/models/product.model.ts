import { Category } from './category.model';

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
  imgUrl?:string;
  category?: Category;
}
