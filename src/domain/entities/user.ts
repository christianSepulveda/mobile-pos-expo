export type User = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  companyid: string;
  active: boolean;
};

export type Login = {
  email: string;
  password: string;
};
