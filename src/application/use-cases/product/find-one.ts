import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";
import { DomainError } from "../../../domain/entities/error";

export class FindOneProduct {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<Product | DomainError> {
    const findedProduct = await this.productRepository.findById(id);
    return findedProduct as Product;
  }
}
