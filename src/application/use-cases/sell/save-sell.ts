import { DomainError } from "../../../domain/entities/error";
import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repository";

export class SaveSell {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(sell: Sell): Promise<Sell | DomainError> {
    const findSummary = await this.sellRepository.saveSell(sell);
    return findSummary;
  }
}
