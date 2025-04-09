import { CashMovement } from "../entities/cash-movement";
import { DomainError } from "../entities/error";

export interface CashMovementRepository {
  save(cashMovement: CashMovement): Promise<CashMovement | DomainError>;
  update(cashMovement: CashMovement): Promise<CashMovement | DomainError>;
  findAll(cashRegisterId: string): Promise<CashMovement[] | DomainError>;
}
