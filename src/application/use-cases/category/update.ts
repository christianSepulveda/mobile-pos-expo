import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { Category } from "../../../domain/entities/category";

export class UpdateCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(category: Category): Promise<Category> {
    const updatedCategory = await this.categoryRepository.update(category);
    return updatedCategory as Category;
  }
}
