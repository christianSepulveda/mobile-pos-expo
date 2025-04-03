import { Sell } from "./sell";
import { SellDetail } from "./sell-detail";

export type Detail = SellDetail & {
  name: string;
  unit_price: number;
  code: string;
  category: string;
};

export type SellSummary = Sell & { details: Detail[] };
