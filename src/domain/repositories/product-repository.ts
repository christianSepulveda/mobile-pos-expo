import { DomainError } from "../entities/error";
import { Product } from "../entities/product";

export type ProductRepository = {
  update: (
    product: Product,
    companyid: string
  ) => Promise<Product | DomainError>;
  save: (product: Product, companyid: string) => Promise<Product | DomainError>;
  findById: (id: string) => Promise<Product | DomainError>;
  findAll: (companyid: string) => Promise<Product[] | DomainError>;
};
