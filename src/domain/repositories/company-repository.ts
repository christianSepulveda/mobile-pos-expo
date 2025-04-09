import { Company } from "../entities/company";

export type CompanyRepository = {
  find: (id: string) => Promise<Company>;
};
