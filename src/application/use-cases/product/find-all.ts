import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";
import { DomainError } from "../../../domain/entities/error";

export class FindAllProducts {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(companyid: string): Promise<Product[] | DomainError> {
    const findedProducts = await this.productRepository.findAll(companyid);
    return findedProducts as Product[];
  }
}
