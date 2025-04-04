import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { Category } from "../../../domain/entities/category";
import { DomainError } from "../../../domain/entities/error";

export class FindAllCategories {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(companyid: string): Promise<Category[] | DomainError> {
    const foundCategories = await this.categoryRepository.findAll(companyid);
    return foundCategories as Category[];
  }
}
