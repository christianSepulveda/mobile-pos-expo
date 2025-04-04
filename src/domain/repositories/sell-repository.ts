import { DomainError } from "../entities/error";
import { Sell } from "../entities/sell";
import { SellSummary } from "../entities/sell-summary";

export type SellRepository = {
  saveSell: (sell: Sell) => Promise<Sell | DomainError>;
  findSellDetails: (sellid: string) => Promise<SellSummary | DomainError>;
  findAllSellsByDate: (
    date: string,
    companyid: string
  ) => Promise<Sell[] | DomainError>;
};
