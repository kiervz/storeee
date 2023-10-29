import Container from "@/app/components/container";
import { Skeleton } from "@/app/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const Loading = () => {
  const items = [1, 2, 3, 4, 5];

  return (
    <Container>
      <div className="flex justify-normal flex-col gap-7">
        <p className="text-xl font-medium py-4">Orders details</p>
        <div className="flex justify-normal flex-col gap-2 h-[68px]">
          <Skeleton className="w-3/12 h-5" />
          <Skeleton className="w-3/12 h-5" />
        </div>
        <div>
          <p className="text-sm md:text-lg font-semibold py-4">Products</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-6/12">Items</TableHead>
                <TableHead className="w-1/12 text-right">Discount</TableHead>
                <TableHead className="w-1/12 text-right">Qty</TableHead>
                <TableHead className="w-2/12 text-right">Unit Price</TableHead>
                <TableHead className="w-2/12 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item}>
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
      </div>
    </Container>
  );
};

export default Loading;
