import { CashMovement } from "../../../domain/entities/cash-movement";
import { CashMovementRepository } from "../../../domain/repositories/cash-movement-repository";

export class FinAllCashMovement {
  constructor(private cashMovementRepository: CashMovementRepository) {}

  async execute(cashRegisterId: string): Promise<CashMovement[]> {
    const allCashMovements = await this.cashMovementRepository.findAll(
      cashRegisterId
    );
    return allCashMovements;
  }
}
