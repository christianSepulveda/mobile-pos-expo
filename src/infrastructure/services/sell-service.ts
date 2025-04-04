import { DomainError } from "../../domain/entities/error";
import { Sell } from "../../domain/entities/sell";
import { SellSummary } from "../../domain/entities/sell-summary";
import { SellRepository } from "../../domain/repositories/sell-repository";
import { makePostRequest } from "../api";

export class SellService implements SellRepository {
  async saveSell(sell: Sell): Promise<Sell | DomainError> {
    const endpoint = "/sells/save";
    const response = (await makePostRequest(endpoint, sell)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedSell = response.data as Sell;
    return savedSell;
  }

  async findSellDetails(sellid: string): Promise<SellSummary | DomainError> {
    const endpoint = "/sell-summary/find-sell-summary";
    const response = (await makePostRequest(endpoint, { sellid })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const summary = response.data as SellSummary;
    return summary;
  }

  async findAllSellsByDate(
    date: string,
    companyid: string
  ): Promise<Sell[] | DomainError> {
    const endpoint = "/sells/find-one";
    const response = (await makePostRequest(endpoint, {
      date,
      companyid,
    })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const sells = response.data as Sell[];
    return sells;
  }
}
