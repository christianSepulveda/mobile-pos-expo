import { DomainError } from "../../domain/entities/error";
import { Product } from "../../domain/entities/product";
import { ProductRepository } from "../../domain/repositories/product-repository";
import { makePostRequest } from "../api";

export class ProductService implements ProductRepository {
  async save(
    product: Product,
    companyid: string
  ): Promise<Product | DomainError> {
    const endpoint = "/products/save";
    const response = (await makePostRequest(endpoint, {
      product,
      companyid,
    })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedProduct = response.data as Product;
    return savedProduct;
  }

  async update(
    product: Product,
    companyid: string
  ): Promise<Product | DomainError> {
    const endpoint = "/products/update";
    const response = (await makePostRequest(endpoint, {
      product,
      companyid,
    })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const updatedProduct = response.data as Product;
    return updatedProduct;
  }

  async findById(id: string): Promise<Product | DomainError> {
    const endpoint = "/products/find-all";
    const response = (await makePostRequest(endpoint, { id })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const product = response.data as Product;
    return product;
  }

  async findAll(companyid: string): Promise<Product[] | DomainError> {
    const endpoint = "/products/find-all";
    const response = (await makePostRequest(endpoint, { companyid })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const product = response.data as Product[];
    return product;
  }
}
