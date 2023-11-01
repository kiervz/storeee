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
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="flex justify-normal flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Skeleton className="w-32 h-10 ml-auto" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="w-3/12">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizes.map((order) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
