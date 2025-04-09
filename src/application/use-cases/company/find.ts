import { Company } from "../../../domain/entities/company";
import { CompanyRepository } from "../../../domain/repositories/company-repository";

export class FindCompany {
  private companyRepository: CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(id: string): Promise<Company | undefined> {
    const findedCompany = await this.companyRepository.find(id);
    return findedCompany;
  }
}
