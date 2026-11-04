import { useMemo } from "react";
import type { CarDetails, CarFilters, SortValue } from "../types/car";
import { filterCars } from "../utils/filterCars";
import { sortCars } from "../utils/sortCars";

export function useFilteredCars(
	cars: CarDetails[],
	filters: CarFilters,
	sort: SortValue,
) {
	const { searchQuery, category, brand } = filters;

	return useMemo(() => {
		const filtered = filterCars(cars, { searchQuery, category, brand });
		return sortCars(filtered, sort);
	}, [cars, searchQuery, category, brand, sort]);
}
