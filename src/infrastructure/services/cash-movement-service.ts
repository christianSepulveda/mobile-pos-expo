import { DomainError } from "../../domain/entities/error";
import { CashMovement } from "../../domain/entities/cash-movement";
import { CashMovementRepository } from "../../domain/repositories/cash-movement-repository";
import { makePostRequest } from "../api";

export class CashMovementService implements CashMovementRepository {
  async save(cashMovement: CashMovement): Promise<CashMovement | DomainError> {
    const endpoint = "/cash-movements/save";
    const response = (await makePostRequest(endpoint, cashMovement)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedCashMovement = response.data as CashMovement;
    return savedCashMovement;
  }

  async update(
    cashMovement: CashMovement
  ): Promise<CashMovement | DomainError> {
    const endpoint = "/cash-movements/update";
    const response = (await makePostRequest(endpoint, cashMovement)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const updatedCashMovement = response.data as CashMovement;
    return updatedCashMovement;
  }

  async findOne(id: string): Promise<CashMovement | DomainError> {
    const endpoint = "/cash-movements/find-one";
    const response = (await makePostRequest(endpoint, { id })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const cashMovement = response.data as CashMovement;
    return cashMovement;
  }

  async findAll(companyid: string): Promise<CashMovement[] | DomainError> {
    const endpoint = "/cash-movements/find-all";
    const response = (await makePostRequest(endpoint, { companyid })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const cashMovements = response.data as CashMovement[];
    return cashMovements;
  }
}
