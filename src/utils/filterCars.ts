import type { CarDetails, CarFilters } from "../types/car";

export function filterCars(
	cars: CarDetails[],
	filters: CarFilters,
): CarDetails[] {
	const q = filters.searchQuery.trim().toLowerCase();

	return cars.filter((car) => {
		const matchesCategory =
			filters.category === "allCategories" || car.category === filters.category;

		const matchesBrand =
			filters.brand === "allBrands" || car.brand === filters.brand;

		const matchesSearch =
			q === "" ||
			car.name.toLowerCase().includes(q) ||
			car.brand.toLowerCase().includes(q);

		return matchesCategory && matchesBrand && matchesSearch;
	});
}
