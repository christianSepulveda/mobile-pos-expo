import { DomainError } from "../../domain/entities/error";
import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repositories/category-repository";
import { makePostRequest } from "../api";

export class CategoryService implements CategoryRepository {
  async save(
    category: Category,
    companyid: string
  ): Promise<Category | DomainError> {
    const endpoint = "/categories/save";
    const response = (await makePostRequest(endpoint, {
      category,
      companyid,
    })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedCategory = response.data as Category;
    return savedCategory;
  }

  async update(category: Category): Promise<Category | DomainError> {
    const endpoint = "/categories/update";
    const response = (await makePostRequest(endpoint, category)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const updatedCategory = response.data as Category;
    return updatedCategory;
  }

  async findById(id: string): Promise<Category | DomainError> {
    const endpoint = "/categories/find-by-id";
    const response = (await makePostRequest(endpoint, { id })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const category = response.data as Category;
    return category;
  }

  async findAll(companyid: string): Promise<Category[] | DomainError> {
    const endpoint = "/categories/find-all";
    const response = (await makePostRequest(endpoint, { companyid })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const categories = response.data as Category[];
    return categories;
  }
}
