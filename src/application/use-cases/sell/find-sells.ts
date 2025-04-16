import { DomainError } from "../../../domain/entities/error";
import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repository";

export class FindSells {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(cashRegisterId: string): Promise<Sell[] | DomainError> {
    const findSummary = await this.sellRepository.findSells(cashRegisterId);
    return findSummary;
  }
}
