import { Product } from "./product";

export interface ProductReport {
  productType: string;

  brand: string;

  products: Product[];
  
  IsActive:boolean;
}
