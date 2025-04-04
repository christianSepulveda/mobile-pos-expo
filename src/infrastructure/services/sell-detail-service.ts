import { DomainError } from "../../domain/entities/error";
import { SellDetail } from "../../domain/entities/sell-detail";
import { SellDetailRepository } from "../../domain/repositories/sell-detail-repository";
import { makePostRequest } from "../api";

export class SellDetailService implements SellDetailRepository {
  async saveSellDetail(
    sellDetail: SellDetail
  ): Promise<SellDetail | DomainError> {
    const endpoint = "/sell-details/save";
    const response = (await makePostRequest(endpoint, sellDetail)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedSellDetail = response.data as SellDetail;
    return savedSellDetail;
  }
}
