import { Category } from "../entities/category";
import { DomainError } from "../entities/error";

export type CategoryRepository = {
  save: (
    category: Category,
    companyid: string
  ) => Promise<Category | DomainError>;

  findById: (id: string) => Promise<Category | DomainError>;
  update: (category: Category) => Promise<Category | DomainError>;
  findAll: (companyid: string) => Promise<Category[] | DomainError>;
};
