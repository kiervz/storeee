import { cn } from "@/app/lib/utils";
import { Skeleton } from "@/app/components/ui/skeleton";
import Container from "@/app/components/container";

const LoadingItem = ({ item }: { item: number }) => {
  return (
    <>
      <Skeleton
        className={cn("h-8 w-full rounded-none", {
          "mt-3": item > 0,
        })}
      />
      <Skeleton className="h-5 w-full rounded-none" />
      <Skeleton className="h-5 w-full rounded-none" />
      <Skeleton className="h-5 w-full rounded-none" />
      <Skeleton className="h-5 w-full rounded-none" />
      <Skeleton className="h-5 w-full rounded-none" />
      <Skeleton className="h-5 w-full rounded-none" />
    </>
  );
};

const Loading = () => {
  return (
    <Container>
      <div className="flex justify-between items-center pb-4 flex-col sm:flex-row">
        <Skeleton className="h-10 w-32 rounded-none" />
        <div className="flex justify-normal items-center text-right py-2 gap-2">
          <Skeleton className="h-10 w-32 rounded-none" />
          <Skeleton className="h-10 w-52 rounded-none" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-normal w-full gap-x-2">
        <div
          className={cn({
            "opacity-100 md:block md:w-2/12": true,
            // "hidden opacity-0": !true,
          })}
        >
          <div
            className={cn("flex flex-col gap-2", {
              "w-full h-screen overflow-y-auto justify-between items-center ":
                true,
            })}
          >
            {[0, 1, 2, 3].map((item) => (
              <LoadingItem item={item} key={item} />
            ))}
          </div>
        </div>
        <div
          className={cn({
            "w-full md:w-10/12": true,
            // "w-full": !openFilter,
          })}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div className="aspect-square" key={item}>
                  <Skeleton className={`rounded-none aspect-square`} />
                  <div className="pt-1">
                    <div className="pt-1">
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="pt-1">
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="pt-1">
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="py-2">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
