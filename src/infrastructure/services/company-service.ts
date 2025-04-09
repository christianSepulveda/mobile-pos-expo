import { Company } from "../../domain/entities/company";
import { CompanyRepository } from "../../domain/repositories/company-repository";
import { makePostRequest } from "../api";

export class CompanyService implements CompanyRepository {
  async find(id: string): Promise<Company> {
    const response = (await makePostRequest("/companies/find", { id })) as any;

    if (!response || response.status !== 200) {
      console.log("Error", response);
      return {} as Company;
    }

    const company = response.data as Company;
    return company;
  }
}
