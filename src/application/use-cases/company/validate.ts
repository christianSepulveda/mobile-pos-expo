import { Company } from "../../../domain/entities/company";
import { CompanyRepository } from "../../../domain/repositories/company-repository";

export class ValidateAdminCode {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyid: string, code: string): Promise<boolean> {
    const isValid = await this.companyRepository.validate(companyid, code);
    return isValid;
  }
}
