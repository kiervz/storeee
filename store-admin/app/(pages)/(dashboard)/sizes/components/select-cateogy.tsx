import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Skeleton } from "@/app/components/ui/skeleton";

const SelectCategory = ({ ...props }) => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => axios.get("/api/categories").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton className="w-full h-10" />;

  if (error) return null;

  return (
    <Select
      disabled={isLoading}
      onValueChange={props.onChange}
      value={props.value}
      defaultValue={props.value}
    >
      <SelectTrigger>
        <SelectValue
          defaultValue={props.value}
          placeholder="Select a category"
        />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((category: Category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
