import { CashMovement } from "../../../domain/entities/cash-movement";
import { CashMovementRepository } from "../../../domain/repositories/cash-movement-repository";

export class UpdateCashMovement {
  constructor(private cashMovementRepository: CashMovementRepository) {}

  async execute(cashMovement: CashMovement): Promise<CashMovement> {
    const cashMovementUpdated = await this.cashMovementRepository.update(
      cashMovement
    );
    return cashMovementUpdated;
  }
}
