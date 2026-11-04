export type CarDetails = {
	id: number;
	name: string;
	brand: string;
	category: string;
	price: number;
	image: string;
	images?: string[];
	seats: number;
	topSpeed: number;
	engine: string;
	drivetrain: string;
};

export type Option = {
	label: string;
	value: string;
};

export type CarFilters = {
	searchQuery: string;
	category: string;
	brand: string;
};

export type SortOption = {
	label: string;
	value: SortValue;
};

export type SortValue =
	| "default"
	| "price-asc"
	| "price-desc"
	| "name-asc"
	| "name-desc"
	| "speed-desc";
