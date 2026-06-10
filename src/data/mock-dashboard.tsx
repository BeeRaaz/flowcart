export type Order = {
  id: string;
  customer: string;
  total: number;
  status: "delivered" | "shipped" | "pending" | "cancelled";
  date: string;
};

export const kpis = [
  {
    label: "Total revenue",
    value: "$24,310",
    change: 12.4,
    sub: "vs last month",
  },
  { label: "Orders", value: "318", change: 8.1, sub: "vs last month" },
  {
    label: "Avg. order value",
    value: "$76.45",
    change: -2.3,
    sub: "vs last month",
  },
  {
    label: "Returning buyers",
    value: "41%",
    change: 5.7,
    sub: "vs last month",
  },
];

export const orders: Order[] = [
  {
    id: "#FC-1042",
    customer: "Mara L.",
    total: 148,
    status: "delivered",
    date: "2025-05-28",
  },
  {
    id: "#FC-1041",
    customer: "James K.",
    total: 138,
    status: "shipped",
    date: "2025-05-27",
  },
  {
    id: "#FC-1040",
    customer: "Soo-Yeon P.",
    total: 96,
    status: "delivered",
    date: "2025-05-26",
  },
  {
    id: "#FC-1039",
    customer: "Rafael M.",
    total: 34,
    status: "pending",
    date: "2025-05-26",
  },
  {
    id: "#FC-1038",
    customer: "Nina W.",
    total: 55,
    status: "delivered",
    date: "2025-05-25",
  },
  {
    id: "#FC-1037",
    customer: "Tom H.",
    total: 28,
    status: "cancelled",
    date: "2025-05-25",
  },
  {
    id: "#FC-1036",
    customer: "Aiko T.",
    total: 210,
    status: "shipped",
    date: "2025-05-24",
  },
  {
    id: "#FC-1035",
    customer: "Lena B.",
    total: 72,
    status: "delivered",
    date: "2025-05-24",
  },
  {
    id: "#FC-1034",
    customer: "Omar F.",
    total: 165,
    status: "delivered",
    date: "2025-05-23",
  },
  {
    id: "#FC-1033",
    customer: "Priya N.",
    total: 42,
    status: "pending",
    date: "2025-05-23",
  },
];

export const revenueData = [
  { day: "May 1", revenue: 620 },
  { day: "May 2", revenue: 480 },
  { day: "May 3", revenue: 910 },
  { day: "May 4", revenue: 740 },
  { day: "May 5", revenue: 1050 },
  { day: "May 6", revenue: 870 },
  { day: "May 7", revenue: 640 },
  { day: "May 8", revenue: 920 },
  { day: "May 9", revenue: 1100 },
  { day: "May 10", revenue: 760 },
  { day: "May 11", revenue: 830 },
  { day: "May 12", revenue: 1240 },
  { day: "May 13", revenue: 950 },
  { day: "May 14", revenue: 1380 },
  { day: "May 15", revenue: 1020 },
  { day: "May 16", revenue: 880 },
  { day: "May 17", revenue: 1150 },
  { day: "May 18", revenue: 990 },
  { day: "May 19", revenue: 720 },
  { day: "May 20", revenue: 1310 },
  { day: "May 21", revenue: 1480 },
  { day: "May 22", revenue: 860 },
  { day: "May 23", revenue: 1090 },
  { day: "May 24", revenue: 1620 },
  { day: "May 25", revenue: 940 },
  { day: "May 26", revenue: 1180 },
  { day: "May 27", revenue: 1350 },
  { day: "May 28", revenue: 780 },
  { day: "May 29", revenue: 1420 },
  { day: "May 30", revenue: 1680 },
];
