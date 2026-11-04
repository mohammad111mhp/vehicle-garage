import "./App.css";
import { useMemo, useState } from "react";
import { CreditCard, Search } from "lucide-react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import DropDown from "./components/DropDown";
import CarModal from "./components/CarModal";
import type { CarDetails, Option, SortOption } from "./types/car";
import { cars } from './db/sample.data';
import { getBrandOptions, getCategoryOptions } from "./utils/getCarOptions";
import { useFilteredCars } from "./hooks/useFilteredCars";
import EmptyState from "./components/EmptyState";

const SORT_OPTIONS: SortOption[] = [
  { label: "Sort by: Default", value: "default" },
  { label: "Price: asc", value: "price-asc" },
  { label: "Price: desc", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
  { label: "Top Speed", value: "speed-desc" },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Option>({
    label: "All Categories",
    value: "allCategories",
  });
  const [selectedBrand, setSelectedBrand] = useState<Option>({
    label: "All Brands",
    value: "allBrands",
  });
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCar, setSelectedCar] = useState<CarDetails | null>(null);

  const categoryOptions = useMemo(() => getCategoryOptions(cars), []);
  const brandOptions = useMemo(() => getBrandOptions(cars), []);

  const filteredCars = useFilteredCars(
    cars,
    {
      searchQuery,
      category: selectedCategory.value,
      brand: selectedBrand.value,
    },
    selectedSort.value
  );

  return (
    <section className="relative flex h-dvh w-full overflow-hidden bg-gray-900">

      <CarModal
        isOpen={selectedCar !== null}
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />

      <Navbar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Hero */}
        <div className="relative flex h-72 shrink-0 flex-col bg-[url(/images/gtav-city.png)] bg-cover bg-center bg-no-repeat px-5 py-4">
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />

          <div className="relative z-10 flex items-center self-end rounded-xl bg-gray-900/80">
            <p className="px-4 py-2">$245,680</p>
            <CreditCard className="size-14 px-4 py-2" />
          </div>

          <div className="relative z-10 mt-auto">
            <h2 className="text-4xl font-bold">Vehicle Garage</h2>
            <p>Your Collection. Your ride.</p>
          </div>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5">

          <div className="flex shrink-0 justify-between gap-3">
            <div className="flex gap-4 rounded-xl border border-gray-600 bg-gray-700/60 px-4 py-3">
              <Search className="cursor-pointer" />
              <input
                className="w-80 2xl:w-md border-0 text-sm outline-0"
                placeholder="Search for a vehicle..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <DropDown
                options={categoryOptions}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
              <DropDown
                options={brandOptions}
                selected={selectedBrand}
                onChange={setSelectedBrand}
              />
              <DropDown
                options={SORT_OPTIONS}
                selected={selectedSort}
                onChange={setSelectedSort}
              />
            </div>
          </div>

          <div className="custom-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto pr-2">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-4 pb-6 md:gap-6">
                {filteredCars.map((car) => (
                  <Card
                    key={car.id}
                    car={car}
                    onViewDetails={setSelectedCar}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                onReset={() => {
                  setSearchQuery("");
                  setSelectedCategory({ label: "All Categories", value: "allCategories" });
                  setSelectedBrand({ label: "All Brands", value: "allBrands" });
                  setSelectedSort(SORT_OPTIONS[0]);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;