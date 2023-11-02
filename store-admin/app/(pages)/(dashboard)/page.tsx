import dayjs from "dayjs";
import DashboardClient from "./_components/dashboard-client";
import prisma from "@/app/lib/prismadb";

interface SearchParamsProps {
  searchParams: {
    from: Date | string;
    to: Date | string;
  };
}

const Dashboard = async ({ searchParams }: SearchParamsProps) => {
  const from =
    searchParams.from === "undefined"
      ? dayjs(Date.now()).format()
      : dayjs(searchParams.from).format();
  const to =
    searchParams.to === "undefined"
      ? dayjs(Date.now()).add(1, "day").format()
      : dayjs(searchParams.to).add(1, "day").format();

  const orders = await prisma.order.findMany({
    where: {
      created_at: {
        gte: from,
        lte: to,
      },
      status: "paid",
      cancel_at: {
        equals: null,
      },
    },
  });

  // Create a map to store daily sales totals
  const dailySales = new Map();

  // Initialize dates and set initial values to zero
  const currentDate = new Date(from);
  while (currentDate <= new Date(to)) {
    dailySales.set(dayjs(currentDate).format().split("T")[0], 0);
    currentDate.setDate(dayjs(currentDate).get("D") + 1);
  }

  // Iterate through the orders and calculate daily totals
  for (const order of orders) {
    const date = dayjs(order.created_at).format().split("T")[0]; // Extract the date (YYYY-MM-DD)
    const amount = order.total_amount;
    dailySales.set(date, Number(dailySales.get(date)) + Number(amount));
  }

  // Convert the map to an array of objects
  const sales = Array.from(dailySales, ([label, value]) => ({
    label,
    value,
  }));

  const allSales = await prisma.order.findMany({
    where: {
      status: "paid",
      cancel_at: {
        equals: null,
      },
    },
  });

  const overAllSales = allSales.reduce((total, currentOrder) => {
    return total + Number(currentOrder.total_amount);
  }, 0);

  // Get the current date at midnight (start of the day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the end of the day (one millisecond before midnight of the next day)
  const endOfDay = new Date(today);
  endOfDay.setDate(today.getDate() + 1);
  endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1);

  const todayAllSales = await prisma.order.findMany({
    where: {
      status: "paid",
      cancel_at: {
        equals: null,
      },
      created_at: {
        gte: today,
        lte: endOfDay,
      },
    },
  });

  const todaySales = todayAllSales.reduce((total, currentOrder) => {
    return total + Number(currentOrder.total_amount);
  }, 0);

  const totalOrders = await prisma.order.count({
    where: {
      status: "paid",
      cancel_at: {
        equals: null,
      },
    },
  });

  return (
    <DashboardClient
      sales={sales}
      todaySales={todaySales}
      overallSales={overAllSales}
      totalOrders={totalOrders}
    />
  );
};

export default Dashboard;
