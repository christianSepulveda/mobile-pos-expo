import { CashRegister } from "../entities/cash-register";
import { DomainError } from "../entities/error";

export type CashRegisterRepository = {
  save: (cashRegister: CashRegister) => Promise<CashRegister | DomainError>;
  update: (cashRegister: CashRegister) => Promise<CashRegister | DomainError>;
  findOne: (id: string) => Promise<CashRegister | DomainError>;
  findAll: (categoryid: string) => Promise<CashRegister[] | DomainError>;
};
