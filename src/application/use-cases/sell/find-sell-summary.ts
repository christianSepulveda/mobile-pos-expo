import { DomainError } from "../../../domain/entities/error";
import { Sell } from "../../../domain/entities/sell";
import { SellSummary } from "../../../domain/entities/sell-summary";
import { SellRepository } from "../../../domain/repositories/sell-repository";

export class FindSellSummary {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(date: string): Promise<SellSummary | DomainError> {
    const findSummary = await this.sellRepository.findSellDetails(date);
    return findSummary;
  }
}
