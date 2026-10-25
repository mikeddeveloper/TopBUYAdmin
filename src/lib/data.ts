
export const salesData = [
  { day: "Wed", full: 2600000, installment: 1450000 },
  { day: "Thu", full: 3050000, installment: 1600000 },
  { day: "Fri", full: 2850000, installment: 1700000 },
  { day: "Sat", full: 3600000, installment: 1950000 },
  { day: "Sun", full: 4150000, installment: 2050000 },
  { day: "Mon", full: 4820000, installment: 2150000 },
  { day: "Tue", full: 4400000, installment: 1900000 },
];

export const overdueInstallments = [
  {
    name: "Chinedu E.",
    item: "Wireless earbuds · plan 2 of 3",
    amount: 32000,
    late: "6 days late",
  },
  {
    name: "Bisi A.",
    item: "Leather handbag · plan 1 of 6",
    amount: 18500,
    late: "4 days late",
  },
  {
    name: "Tunde K.",
    item: "Smartwatch · plan 3 of 3",
    amount: 41000,
    late: "2 days late",
  },
];

export type OrderStatus = "Paid" | "Shipped" | "Pending" | "Overdue";

export const recentOrders: {
  id: string;
  customer: string;
  payment: string;
  total: number;
  status: OrderStatus;
}[] = [
  { id: "#TB-10482", customer: "Amaka Obi", payment: "TracPay · 3 months", total: 186500, status: "Paid" },
  { id: "#TB-10481", customer: "Seyi Adeyemi", payment: "Full payment", total: 42000, status: "Shipped" },
  { id: "#TB-10480", customer: "Ngozi Eze", payment: "TracPay · 6 months", total: 420000, status: "Pending" },
  { id: "#TB-10479", customer: "Tunde Kareem", payment: "Full payment", total: 12800, status: "Paid" },
  { id: "#TB-10478", customer: "Bisi Alabi", payment: "TracPay · 6 months", total: 95000, status: "Overdue" },
];

export const lowStockItems = [
  { letter: "W", name: "Wireless earbuds", detail: "Black · 3 variants low", left: "3 left" },
  { letter: "A", name: "Ankara shirt", detail: "Size L · Blue", left: "2 left" },
  { letter: "P", name: "Phone case", detail: "Clear · all models", left: "5 left" },
  { letter: "L", name: "Leather belt", detail: "Brown · 34 in", left: "1 left" },
];

export type InstallmentStatus = "On track" | "Due soon" | "Overdue" | "Completed";

export const installmentPlans: {
  name: string;
  item: string;
  progressLabel: string;
  progressRatio: number;
  nextDue: string;
  amount: number;
  status: InstallmentStatus;
}[] = [
  {
    name: "Chinedu Eze",
    item: "Wireless earbuds · 3 months",
    progressLabel: "1 of 3 payments",
    progressRatio: 1 / 3,
    nextDue: "14 Oct",
    amount: 32000,
    status: "Overdue",
  },
  {
    name: "Bisi Alabi",
    item: "Leather handbag · 6 months",
    progressLabel: "1 of 6 payments",
    progressRatio: 1 / 6,
    nextDue: "16 Oct",
    amount: 18500,
    status: "Overdue",
  },
  {
    name: "Amaka Obi",
    item: "Smartphone 128 GB · 6 months",
    progressLabel: "2 of 6 payments",
    progressRatio: 2 / 6,
    nextDue: "22 Oct",
    amount: 46800,
    status: "Due soon",
  },
  {
    name: "Ngozi Eze",
    item: "Smartwatch · 3 months",
    progressLabel: "2 of 3 payments",
    progressRatio: 2 / 3,
    nextDue: "24 Oct",
    amount: 25700,
    status: "Due soon",
  },
  {
    name: "Seyi Adeyemi",
    item: "Running sneakers · 3 months",
    progressLabel: "1 of 3 payments",
    progressRatio: 1 / 3,
    nextDue: "3 Nov",
    amount: 10500,
    status: "On track",
  },
  {
    name: "Tunde Kareem",
    item: "Laptop backpack · 3 months",
    progressLabel: "3 of 3 payments",
    progressRatio: 1,
    nextDue: "None",
    amount: 0,
    status: "Completed",
  },
  {
    name: "Halima Musa",
    item: "Smartphone 128 GB · 6 months",
    progressLabel: "4 of 6 payments",
    progressRatio: 4 / 6,
    nextDue: "5 Nov",
    amount: 46800,
    status: "On track",
  },
];

export const planTemplates = [
  { name: "3 months", terms: "30% deposit · 0% fee", active: true },
  { name: "6 months", terms: "40% deposit · 5% fee", active: true },
  { name: "12 months", terms: "50% deposit · 10% fee", active: false },
];

export type FullOrderStatus = "Paid" | "Shipped" | "Pending" | "Overdue" | "Delivered";

export const allOrders: {
  id: string;
  customer: string;
  items: string;
  payment: string;
  total: number;
  status: FullOrderStatus;
  date: string;
}[] = [
  { id: "#TB-10482", customer: "Amaka Obi", items: "Leather handbag", payment: "TracPay · 3 months", total: 186500, status: "Paid", date: "20 Oct" },
  { id: "#TB-10481", customer: "Seyi Adeyemi", items: "Running sneakers", payment: "Full payment", total: 42000, status: "Shipped", date: "20 Oct" },
  { id: "#TB-10480", customer: "Ngozi Eze", items: "Smartwatch", payment: "TracPay · 6 months", total: 420000, status: "Pending", date: "19 Oct" },
  { id: "#TB-10479", customer: "Tunde Kareem", items: "Laptop backpack", payment: "Full payment", total: 12800, status: "Paid", date: "19 Oct" },
  { id: "#TB-10478", customer: "Bisi Alabi", items: "Leather handbag", payment: "TracPay · 6 months", total: 95000, status: "Overdue", date: "18 Oct" },
  { id: "#TB-10477", customer: "Halima Musa", items: "Smartphone 128 GB", payment: "TracPay · 6 months", total: 312000, status: "Delivered", date: "18 Oct" },
  { id: "#TB-10476", customer: "Chinedu Eze", items: "Wireless earbuds", payment: "TracPay · 3 months", total: 28500, status: "Overdue", date: "17 Oct" },
  { id: "#TB-10475", customer: "Funmi Bello", items: "Ankara shirt", payment: "Full payment", total: 18000, status: "Delivered", date: "17 Oct" },
  { id: "#TB-10474", customer: "Emeka Nwosu", items: "Phone case", payment: "Full payment", total: 4500, status: "Paid", date: "16 Oct" },
  { id: "#TB-10473", customer: "Grace Okafor", items: "Smartwatch", payment: "TracPay · 3 months", total: 97000, status: "Shipped", date: "16 Oct" },
];

export const customers: {
  name: string;
  email: string;
  orders: number;
  spent: number;
  standing: "Good standing" | "Has overdue";
  joined: string;
}[] = [
  { name: "Amaka Obi", email: "amaka.obi@gmail.com", orders: 14, spent: 612000, standing: "Good standing", joined: "Jan 2025" },
  { name: "Seyi Adeyemi", email: "seyi.a@gmail.com", orders: 6, spent: 184500, standing: "Good standing", joined: "Mar 2025" },
  { name: "Ngozi Eze", email: "ngozi.eze@yahoo.com", orders: 9, spent: 940000, standing: "Good standing", joined: "Nov 2024" },
  { name: "Bisi Alabi", email: "bisi.alabi@gmail.com", orders: 4, spent: 215000, standing: "Has overdue", joined: "Jun 2025" },
  { name: "Chinedu Eze", email: "chinedu.e@outlook.com", orders: 3, spent: 76500, standing: "Has overdue", joined: "Aug 2025" },
  { name: "Halima Musa", email: "halima.musa@gmail.com", orders: 11, spent: 528000, standing: "Good standing", joined: "Feb 2025" },
  { name: "Tunde Kareem", email: "tunde.k@gmail.com", orders: 7, spent: 98200, standing: "Good standing", joined: "May 2025" },
];

export const billPayments: {
  customer: string;
  biller: string;
  type: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  date: string;
}[] = [
  { customer: "Amaka Obi", biller: "MTN", type: "Airtime", amount: 2000, status: "Paid", date: "20 Oct" },
  { customer: "Tunde Kareem", biller: "IKEDC", type: "Electricity", amount: 15000, status: "Paid", date: "20 Oct" },
  { customer: "Ngozi Eze", biller: "DStv", type: "Cable TV", amount: 24500, status: "Pending", date: "19 Oct" },
  { customer: "Seyi Adeyemi", biller: "Airtel", type: "Data", amount: 3500, status: "Paid", date: "19 Oct" },
  { customer: "Bisi Alabi", biller: "EKEDC", type: "Electricity", amount: 8000, status: "Failed", date: "18 Oct" },
  { customer: "Grace Okafor", biller: "GOtv", type: "Cable TV", amount: 6400, status: "Paid", date: "17 Oct" },
];

export const paymentMethods = [
  { label: "Card", amount: 1860000, share: 44 },
  { label: "Bank transfer", amount: 1520000, share: 36 },
  { label: "Wallet", amount: 430000, share: 10 },
  { label: "TracPay debit", amount: 420000, share: 10 },
];

export const transactions: {
  reference: string;
  customer: string;
  method: string;
  amount: number;
  status: "Successful" | "Pending" | "Failed";
  date: string;
}[] = [
  { reference: "TBX-88213", customer: "Amaka Obi", method: "Card", amount: 186500, status: "Successful", date: "20 Oct" },
  { reference: "TBX-88212", customer: "Seyi Adeyemi", method: "Bank transfer", amount: 42000, status: "Successful", date: "20 Oct" },
  { reference: "TBX-88211", customer: "Ngozi Eze", method: "Wallet", amount: 70000, status: "Pending", date: "19 Oct" },
  { reference: "TBX-88210", customer: "Bisi Alabi", method: "TracPay debit", amount: 18500, status: "Failed", date: "18 Oct" },
  { reference: "TBX-88209", customer: "Halima Musa", method: "Card", amount: 312000, status: "Successful", date: "18 Oct" },
];

export const promotions: {
  code: string;
  description: string;
  discount: string;
  used: number;
  limit: number;
  status: "Active" | "Scheduled" | "Expired";
  expires: string;
}[] = [
  { code: "DETTY25", description: "December festive discount storewide", discount: "15% off", used: 340, limit: 1000, status: "Active", expires: "31 Dec" },
  { code: "FIRSTBUY", description: "First order discount for new customers", discount: "₦2,000 off", used: 812, limit: 2000, status: "Active", expires: "No expiry" },
  { code: "GADGETWK", description: "Gadgets category flash sale", discount: "10% off", used: 156, limit: 500, status: "Scheduled", expires: "1 Nov" },
  { code: "EID2025", description: "Eid promo, fashion and accessories", discount: "20% off", used: 980, limit: 980, status: "Expired", expires: "9 Apr" },
];

export const staffMembers: {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Support" | "Inventory";
  lastActive: string;
  status: "Active" | "Invited";
}[] = [
  { name: "Ayomide D.", email: "ayomide@topbuy.ng", role: "Owner", lastActive: "Active now", status: "Active" },
  { name: "Chiamaka N.", email: "chiamaka@topbuy.ng", role: "Admin", lastActive: "2 hours ago", status: "Active" },
  { name: "Daniel O.", email: "daniel@topbuy.ng", role: "Support", lastActive: "Yesterday", status: "Active" },
  { name: "Blessing A.", email: "blessing@topbuy.ng", role: "Inventory", lastActive: "3 days ago", status: "Active" },
  { name: "Kelechi U.", email: "kelechi@topbuy.ng", role: "Support", lastActive: "Never signed in", status: "Invited" },
];
