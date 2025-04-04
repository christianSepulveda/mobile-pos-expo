import { ProductRepository } from "../../../domain/repositories/product-repository";
import { Product } from "../../../domain/entities/product";

export class SaveProduct {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product, companyid: string): Promise<Product> {
    const newProduct = await this.productRepository.save(product, companyid);
    return newProduct as Product;
  }
}
