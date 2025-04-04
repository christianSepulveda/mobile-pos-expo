import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { Category } from "../../../domain/entities/category";
import { DomainError } from "../../../domain/entities/error";

export class FindOneCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: string): Promise<Category | DomainError> {
    const foundCategory = await this.categoryRepository.findById(id);
    return foundCategory as Category;
  }
}
