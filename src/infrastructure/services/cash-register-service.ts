import { DomainError } from "../../domain/entities/error";
import { CashRegister } from "../../domain/entities/cash-register";
import { CashRegisterRepository } from "../../domain/repositories/cash-register-repository";
import { makePostRequest } from "../api";

export class CashRegisterService implements CashRegisterRepository {
  async save(cashRegister: CashRegister): Promise<CashRegister | DomainError> {
    const endpoint = "/cash-registers/save";
    const response = (await makePostRequest(endpoint, cashRegister)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const savedCashRegister = response.data as CashRegister;
    return savedCashRegister;
  }

  async update(
    cashRegister: CashRegister
  ): Promise<CashRegister | DomainError> {
    const endpoint = "/cash-registers/update";
    const response = (await makePostRequest(endpoint, cashRegister)) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const updatedCashRegister = response.data as CashRegister;
    return updatedCashRegister;
  }

  async findOne(id: string): Promise<CashRegister | DomainError> {
    const endpoint = "/cash-registers/find-one";
    const response = (await makePostRequest(endpoint, { id })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const cashRegister = response.data as CashRegister;
    return cashRegister;
  }

  async findAll(companyid: string): Promise<CashRegister[] | DomainError> {
    const endpoint = "/cash-registers/find-all";
    const response = (await makePostRequest(endpoint, { companyid })) as any;

    if (!response || response.status !== 200) {
      return { code: response.code, message: response.message, error: true };
    }

    const cashRegisters = response.data as CashRegister[];
    return cashRegisters;
  }
}
