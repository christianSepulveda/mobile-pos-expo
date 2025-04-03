import { DomainError } from "../../../domain/entities/error";
import { Sell } from "../../../domain/entities/sell";
import { SellRepository } from "../../../domain/repositories/sell-repository";

export class FindSellSummary {
  private sellRepository: SellRepository;

  constructor(sellRepository: SellRepository) {
    this.sellRepository = sellRepository;
  }

  async execute(
    date: string,
    companyid: string
  ): Promise<Sell[] | DomainError> {
    const findSell = await this.sellRepository.findAllSellsByDate(
      date,
      companyid
    );
    return findSell;
  }
}
