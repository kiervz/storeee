import { Skeleton } from "@/app/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="w-48 h-9" />
        <Skeleton className="w-72 h-5 mt-2" />
      </div>
      <div>
        <Skeleton className="w-48 h-5" />
        <Skeleton className="w-full h-10 mt-2" />
      </div>
      <div>
        <Skeleton className="w-48 h-5" />
        <Skeleton className="w-full h-20 mt-2" />
      </div>

      <div className="flex justify-normal flex-col md:flex-row gap-4 w-full">
        <div className="w-full">
          <Skeleton className="w-48 h-5" />
          <Skeleton className="w-full h-10 mt-2" />
        </div>
        <div className="w-full">
          <Skeleton className="w-48 h-5" />
          <Skeleton className="w-full h-10 mt-2" />
        </div>
      </div>

      <div>
        <Skeleton className="w-48 h-5 mt-1" />
        <Skeleton className="w-96  h-5 mt-2" />
      </div>
      <div>
        <Skeleton className="w-32 h-9" />
      </div>
      <div>
        <Skeleton className="w-full h-64" />
      </div>
    </div>
  );
};

export default Loading;
