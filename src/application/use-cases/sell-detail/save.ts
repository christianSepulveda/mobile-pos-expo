import { DomainError } from "../../../domain/entities/error";
import { SellDetail } from "../../../domain/entities/sell-detail";
import { SellDetailRepository } from "../../../domain/repositories/sell-detail-repository";

export class SaveSellDetail {
  private sellDetailRepository: SellDetailRepository;

  constructor(sellDetailRepository: SellDetailRepository) {
    this.sellDetailRepository = sellDetailRepository;
  }

  async execute(sellDetail: SellDetail): Promise<SellDetail | DomainError> {
    const result = await this.sellDetailRepository.saveSellDetail(sellDetail);
    return result;
  }
}
