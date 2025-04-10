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

  async validate(companyid: string, code: string): Promise<boolean> {
    const response = (await makePostRequest("/companies/validate", {
      companyid,
      adminCode: code,
    })) as any;

    if (!response || response.status !== 200) {
      console.log("Error", response);
      return false;
    }

    return response.data.isValid as boolean;
  }
}
