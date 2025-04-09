export type CashRegister = {
  id?: string;
  date: string;
  time: string;
  closing_time: string; // Hora exacta de cierre de caja.
  userid: string;
  initial_cash: number;
  closing_cash: number; // Para registrar cuánto dinero se contó al cerrar la caja.
  expected_cash: number; // Calculado por el sistema: initial_cash + ventas en efectivo - egresos.
  cash_difference: number; // closing_cash - expected_cash.
  notes: string; // Para observaciones si hay diferencias, egresos no registrados, problemas, etc.
  total_sales: number; // Ventas totales (puede estar separado por método de pago).
  companyid: string;
  active: boolean;
};
