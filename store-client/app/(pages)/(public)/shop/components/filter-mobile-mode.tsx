import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Brand, Category, Color } from "@prisma/client";

import { Button } from "@/app/components/ui/button";
import FilterClient from "./filter";

interface FilterMobileModeProps {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  handleClick: (e: any) => void;
  windowWidth: number;
  openFilter: boolean;
  setToggleFilter: (value: boolean) => void;
  handleSearchParams: (key: string, value: string) => void;
}

const FilterMobileMode: React.FC<FilterMobileModeProps> = ({
  categories,
  brands,
  colors,
  handleClick,
  windowWidth,
  openFilter,
  setToggleFilter,
  handleSearchParams,
}) => {
  return (
    <AnimatePresence>
      {openFilter && windowWidth < 769 && (
        <div
          onClick={handleClick}
          className="fixed md:hidden bottom-0 left-0 w-full h-screen flex flex-col items-end z-[9999] overflow-hidden"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full bg-white h-screen shadow-lg relative z-[99]"
          >
            <motion.div
              animate={{ rotate: [180, 0, 0] }}
              className="text-black cursor-pointer absolute top-4 right-4"
            >
              <Button
                onClick={() => setToggleFilter(false)}
                size="icon"
                className="rounded-full"
                variant="default"
              >
                <X strokeWidth="2.25" size={28} />
              </Button>
            </motion.div>
            <FilterClient
              categoriesData={categories}
              brandsData={brands}
              colorsData={colors}
              setCloseFilter={setToggleFilter}
              handleSearchParams={handleSearchParams}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FilterMobileMode;
