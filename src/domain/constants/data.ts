import { Category } from "../entities/category";
import { PaymentMethod } from "../entities/payment-method";
import { Product } from "../entities/product";
import { Sell } from "../entities/sell";

export const Sells: Sell[] = [
  {
    date: "2022/01/01",
    time: "10:30",
    id: "1",
    sell_number: "0000456",
    total: 15000,
  },
  {
    date: "2022/01/02",
    time: "11:00",
    id: "2",
    sell_number: "0000457",
    total: 18000,
  },
  {
    date: "2022/01/03",
    time: "12:15",
    id: "3",
    sell_number: "0000458",
    total: 20000,
  },
  {
    date: "2022/01/04",
    time: "13:45",
    id: "4",
    sell_number: "0000459",
    total: 22000,
  },
  {
    date: "2022/01/05",
    time: "14:30",
    id: "5",
    sell_number: "0000460",
    total: 25000,
  },
  {
    date: "2022/01/06",
    time: "15:00",
    id: "6",
    sell_number: "0000461",
    total: 27000,
  },
  {
    date: "2022/01/07",
    time: "16:20",
    id: "7",
    sell_number: "0000462",
    total: 30000,
  },
  {
    date: "2022/01/08",
    time: "17:10",
    id: "8",
    sell_number: "0000463",
    total: 32000,
  },
  {
    date: "2022/01/09",
    time: "18:05",
    id: "9",
    sell_number: "0000464",
    total: 35000,
  },
  {
    date: "2022/01/10",
    time: "19:00",
    id: "10",
    sell_number: "0000465",
    total: 40000,
  },
];

export const Products: Product[] = [
  {
    id: "1",
    name: "Endulsante Iansa Cero K Sucralosa",
    price: 1000,
    code: "7801505000235",
    category_id: "1",
    active: true,
  },
  {
    id: "2",
    name: "Libro Para Colorear Libro Color",
    price: 2000,
    code: "9788479718336",
    category_id: "C1",
    active: true,
  },
  {
    id: "3",
    name: "Product 3",
    price: 3000,
    code: "P0003",
    category_id: "C2",
    active: true,
  },
  {
    id: "4",
    name: "Product 4",
    price: 4000,
    code: "P0004",
    category_id: "C2",
    active: true,
  },
  {
    id: "5",
    name: "Product 5",
    price: 5000,
    code: "P0005",
    category_id: "C3",
    active: true,
  },
  {
    id: "6",
    name: "Product 6",
    price: 6000,
    code: "P0006",
    category_id: "C3",
    active: true,
  },
  {
    id: "7",
    name: "Product 7",
    price: 7000,
    code: "P0007",
    category_id: "C4",
    active: true,
  },
  {
    id: "8",
    name: "Product 8",
    price: 8000,
    code: "P0008",
    category_id: "C4",
    active: true,
  },
  {
    id: "9",
    name: "Product 9",
    price: 9000,
    code: "P0009",
    category_id: "C5",
    active: true,
  },
  {
    id: "10",
    name: "Product 10",
    price: 10000,
    code: "P0010",
    category_id: "C5",
    active: true,
  },
];

export const PaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "Efectivo",
    active: true,
  },
  {
    id: "2",
    name: "Débito",
    active: true,
  },
  {
    id: "3",
    name: "Crédito",
    active: true,
  },
  {
    id: "4",
    name: "Transferencia",
    active: true,
  },
];
