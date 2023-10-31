import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Skeleton } from "@/app/components/ui/skeleton";

const Loading = () => {
  const orders = [1, 2, 3, 4, 5];

  return (
    <div className="flex justify-normal flex-col gap-4">
      <div className="flex items-center gap-4 w-auto h-10">
        <Skeleton className="w-10 h-10" />
        <Skeleton className="w-14 h-10" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-5/12">Date</TableHead>
            <TableHead className="w-1/12">Status</TableHead>
            <TableHead className="w-2/12">Delivery Status</TableHead>
            <TableHead className="w-1/12">Method</TableHead>
            <TableHead className="w-2/12 text-right">Amount </TableHead>
            <TableHead className="w-1/12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order}>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
