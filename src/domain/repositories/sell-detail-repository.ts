import { DomainError } from "../entities/error";
import { SellDetail } from "../entities/sell-detail";

export type SellDetailRepository = {
  saveSellDetail: (sellDetail: SellDetail) => Promise<SellDetail | DomainError>;
};
