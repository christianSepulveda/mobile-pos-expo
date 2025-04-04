import { CategoryRepository } from "../../../domain/repositories/category-repository";
import { Category } from "../../../domain/entities/category";

export class SaveCategory {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(category: Category, companyid: string): Promise<Category> {
    const newCategory = await this.categoryRepository.save(category, companyid);
    return newCategory as Category;
  }
}
