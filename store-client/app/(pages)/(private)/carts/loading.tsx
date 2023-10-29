import Container from "@/app/components/container";
import { Skeleton } from "@/app/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="flex justify-normal items-start flex-col md:flex-row gap-6">
        <div className="w-full md:w-8/12">
          <div className="flex justify-normal flex-col gap-4">
            <Skeleton className="h-32 md:h-44 w-full" />
            <Skeleton className="h-32 md:h-44 w-full" />
            <Skeleton className="h-32 md:h-44 w-full" />
            <Skeleton className="hidden md:block h-44 w-full" />
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <Skeleton className="h-72" />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
