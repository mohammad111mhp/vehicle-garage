import type { CarDetails, SortValue } from "../types/car";

export function sortCars(cars: CarDetails[], sort: SortValue): CarDetails[] {
	const copy = [...cars];

	switch (sort) {
		case "price-asc":
			return copy.sort((a, b) => a.price - b.price);
		case "price-desc":
			return copy.sort((a, b) => b.price - a.price);
		case "name-asc":
			return copy.sort((a, b) => a.name.localeCompare(b.name));
		case "name-desc":
			return copy.sort((a, b) => b.name.localeCompare(a.name));
		case "speed-desc":
			return copy.sort((a, b) => b.topSpeed - a.topSpeed);
		case "default":
		default:
			return copy;
	}
}
