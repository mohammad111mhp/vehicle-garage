import { Search } from "lucide-react";

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-800">
        <Search className="size-8 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-white">No vehicles found</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-400">
        No cars match your current filters. Try changing them or reset.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Reset filters
      </button>
    </div>
  );
}

export default EmptyState;