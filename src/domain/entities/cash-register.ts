export type CashRegister = {
  id?: string;

  open_userid: string;
  open_date: string;
  open_time: string;
  open_cash: number;

  closing_userid: string;
  closing_date: string;
  closing_time: string;

  closing_cash: number;
  closing_debit: number;
  closing_credit: number;
  closing_transference: number;

  notes: string;
  active: boolean;
  companyid: string;
};
