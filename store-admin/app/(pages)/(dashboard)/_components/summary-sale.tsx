import { Card } from "@/app/components/ui/card";
import { FormatCurrency } from "@/app/lib/format";

interface SummarySaleProps {
  todaySales: number;
  overallSales: number;
  totalOrders: number;
}

const SummarySale = ({
  todaySales,
  overallSales,
  totalOrders,
}: SummarySaleProps) => {
  const containers = [
    { label: "Today's Sales", value: FormatCurrency(todaySales) },
    {
      label: "Overall Sales",
      value: FormatCurrency(overallSales),
    },
    { label: "Total Orders", value: FormatCurrency(totalOrders) },
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      {containers.map((container) => (
        <div key={container.label} className="w-full col-span-12 md:col-span-4">
          <Card className="p-5 w-full">
            <div className="flex flex-col gap-5">
              <p className="text-sm md:text-lg">{container.label}</p>
              <p className="text-base md:text-xl font-semibold">
                {container.value}
              </p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SummarySale;
