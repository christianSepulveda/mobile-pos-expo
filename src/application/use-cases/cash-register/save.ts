import { randomUUID } from "crypto";
import { CashRegister } from "../../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../../domain/repositories/cash-register-repository";
import { DomainError } from "../../../domain/entities/error";

export class SaveCashRegister {
  private cashRegisterRepository: CashRegisterRepository;

  constructor(cashRegisterRepository: CashRegisterRepository) {
    this.cashRegisterRepository = cashRegisterRepository;
  }

  async execute(
    cashRegister: CashRegister
  ): Promise<CashRegister | DomainError> {
    const id = randomUUID();

    const savedCashRegister = await this.cashRegisterRepository.save({
      ...cashRegister,
      id,
    });

    return savedCashRegister;
  }
}
