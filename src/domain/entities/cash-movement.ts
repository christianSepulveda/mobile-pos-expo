export type CashMovementType = "INCOME" | "EXPENSE";

export interface CashMovement {
  id?: string;
  date: string;
  time: string;
  amount: number;
  cashRegisterId: string;
  note?: string;
  type: CashMovementType;
  userId: string;
}
