import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Skeleton } from "@/app/components/ui/skeleton";
import Container from "@/app/components/container";

const Loading = () => {
  const orders = [1, 2, 3, 4, 5];

  return (
    <Container>
      <p className="text-xl font-medium py-4">Orders</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4/12">Date</TableHead>
            <TableHead className="w-1/12">Status</TableHead>
            <TableHead className="w-3/12">Delivery Status</TableHead>
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
    </Container>
  );
};

export default Loading;
