"use client";

import {
  ResponsiveContainer,
  AreaChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Area,
  Tooltip,
  Legend,
} from "recharts";

import DateRangePicker from "./date-range-picker";
import SummarySale from "./summary-sale";
import { Card } from "@/app/components/ui/card";

interface SalesDataProps {
  label: string;
  value: number;
}

interface DashboardClientProps {
  sales: SalesDataProps[];
  todaySales: number;
  overallSales: number;
  totalOrders: number;
}

const DashboardClient = ({
  sales,
  todaySales,
  overallSales,
  totalOrders,
}: DashboardClientProps) => {
  return (
    <div className="flex justify-normal flex-col w-full h-full gap-4">
      <SummarySale
        todaySales={todaySales}
        overallSales={overallSales}
        totalOrders={totalOrders}
      />
      <Card className="flex justify-normal flex-col">
        <div className="ml-auto mx-6 my-2">
          <DateRangePicker />
        </div>
        <ResponsiveContainer width="100%" height={600}>
          <AreaChart
            width={500}
            height={300}
            data={sales}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1E40AF"
              fill="#3B82F6"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default DashboardClient;
