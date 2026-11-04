import type { CarDetails, Option } from "../types/car";

export function getCategoryOptions(cars: CarDetails[]): Option[] {
	const unique = Array.from(new Set(cars.map((c) => c.category))).sort();
	return [
		{ label: "All Categories", value: "allCategories" },
		...unique.map((c) => ({ label: c, value: c })),
	];
}

export function getBrandOptions(cars: CarDetails[]): Option[] {
	const unique = Array.from(new Set(cars.map((c) => c.brand))).sort();
	return [
		{ label: "All Brands", value: "allBrands" },
		...unique.map((b) => ({ label: b, value: b })),
	];
}
