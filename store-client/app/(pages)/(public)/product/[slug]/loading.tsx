import Container from "@/app/components/container";
import { Skeleton } from "@/app/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="flex justify-normal flex-col lg:flex-row gap-10 relative">
        <div className="flex justify-normal flex-row w-full lg:w-7/12 lg:sticky lg:top-16 gap-4 h-auto lg:h-[669px]">
          <div className="hidden relative lg:flex justify-normal items-center flex-col gap-2 w-3/12 lg:w-2/12 h-[535px] overflow-y-scroll no-scrollbar">
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
          </div>
          <div className="flex justify-normal flex-col gap-4 w-full lg:w-10/12 h-auto ">
            <div className="flex justify-normal flex-col px-4 md:px-0 md:hidden gap-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full mt-2" />
            </div>
            <Skeleton className="rounded-none md:rounded-md w-full h-full min-h-[669px] max-h-[669px]" />
          </div>
        </div>
        <div className="flex justify-normal flex-col gap-6 w-full lg:w-4/12 ml-0 lg:ml-10 h-auto px-4 lg:px-0">
          <div className="hidden md:flex justify-normal flex-col gap-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full mt-2" />
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 gap-2">
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
            <Skeleton className="rounded-md aspect-square h-16 w-16" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <Skeleton className="rounded-md h-6 w-32" />
              <Skeleton className="rounded-md h-6 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-10 px-4 py-6" />
            <Skeleton className="h-10 px-4 py-6" />
            <Skeleton className="h-10 px-4 py-6" />
            <Skeleton className="h-10 px-4 py-6" />
            <Skeleton className="h-10 px-4 py-6" />
            <Skeleton className="h-10 px-4 py-6" />
          </div>
          <Skeleton className="w-full rounded-full h-14" />
          <Skeleton className="w-full rounded-full h-14" />
          <div className="flex justify-normal gap-2 flex-col">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
