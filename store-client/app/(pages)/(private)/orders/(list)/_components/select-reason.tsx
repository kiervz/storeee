import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Skeleton } from "@/app/components/ui/skeleton";

interface CancellationReasonType {
  id: string;
  code: string;
  name: string;
}

const SelectReason = ({ ...props }) => {
  const {
    data: reasons,
    error,
    isLoading,
  } = useQuery<CancellationReasonType[]>({
    queryKey: ["reasons"],
    queryFn: () => axios.get("/api/cancellations").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton className="w-full h-10" />;

  return (
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <SelectTrigger>
        <SelectValue placeholder="Select a reason" />
      </SelectTrigger>
      <SelectContent>
        {reasons?.map((reason: CancellationReasonType) => (
          <SelectItem key={reason.id} value={reason.code}>
            {reason.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectReason;
