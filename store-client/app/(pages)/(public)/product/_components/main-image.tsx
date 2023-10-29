import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainImageProps {
  currentImage: string;
  handlePreviousImage: () => void;
  handleNextImage: () => void;
  imageIndex: number;
  variationImageLength: number;
}

const MainImage: React.FC<MainImageProps> = ({
  currentImage,
  handlePreviousImage,
  handleNextImage,
  imageIndex,
  variationImageLength,
}) => {
  return (
    <div className="relative">
      <Image
        src={currentImage}
        alt="Main Image"
        priority
        className="rounded-none md:rounded-md w-full h-full min-h-[669px] max-h-[669px]"
        width={0}
        height={0}
        sizes="100vw"
        quality={100}
        style={{
          objectFit: "cover",
        }}
      />
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 md:left-auto md:right-16 bottom-1/2 md:bottom-5 w-10 h-10 flex justify-center items-center rounded-full"
        onClick={handlePreviousImage}
        disabled={imageIndex === 0}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 bottom-1/2 md:bottom-5 w-10 h-10 flex justify-center items-center rounded-full"
        onClick={handleNextImage}
        disabled={imageIndex === variationImageLength - 1}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default MainImage;
