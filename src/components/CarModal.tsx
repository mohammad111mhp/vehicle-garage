import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Spec from "./Spec";
import { Users, Gauge, Cog, Car, Image as ImageIcon, Palette } from "lucide-react";
import type { CarDetails } from "../types/car";

type CarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  car?: CarDetails | null;
};

const PRESET_COLORS = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Violet", value: "#8b5cf6" },
];

const DEFAULT_CAR_COLOR = PRESET_COLORS[0].value;

function CarModal({ isOpen, onClose, car }: CarModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carColor, setCarColor] = useState(DEFAULT_CAR_COLOR);

  // Escape + Scroll Lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !car) return null;

  const gallery = (car.images && car.images.length > 0 ? car.images : [car.image]).filter(Boolean);
  const safeIndex = Math.min(activeIndex, Math.max(gallery.length - 1, 0));
  const activeImage = gallery[safeIndex];

  // Custom color label
  const presetMatch = PRESET_COLORS.find(
    (c) => c.value.toLowerCase() === carColor.toLowerCase()
  );
  const colorLabel = presetMatch ? presetMatch.name : carColor.toUpperCase();

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="car-modal-title"
        className="relative z-10 flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-gray-800 shadow-2xl ring-1 ring-white/10"
      >
        {/* Close button — top left */}
        {/* <button
          onClick={onClose}
          aria-label="Close"
          className="absolute left-4 top-4 z-20 flex size-10 items-center justify-center rounded-full cursor-pointer bg-gray-900/80 text-gray-300 backdrop-blur transition hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="size-5" />
        </button> */}

        {/* Main Image */}
        <div className="relative h-64 shrink-0">
          {activeImage ? (
            <img src={activeImage} alt={car.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-500">
              <ImageIcon className="size-12" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-gray-800 via-gray-800/60 to-transparent" />
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="shrink-0 border-b border-gray-700 bg-gray-800 px-6 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin [scrollbar-color:#4b5563_transparent]">
              {gallery.map((img, i) => {
                const isActive = i === safeIndex;
                return (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`View image ${i + 1} of ${gallery.length}`}
                    aria-pressed={isActive}
                    className={`relative shrink-0 overflow-hidden rounded-lg ring-2 transition-all duration-150 ${isActive
                      ? "ring-blue-500"
                      : "ring-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="size-14 object-cover" loading="lazy" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6">
          <div>
            <p className="text-sm text-gray-400">
              {car.brand} • {car.category}
            </p>
            <h2 id="car-modal-title" className="text-2xl font-bold text-white">
              {car.name}
            </h2>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Spec icon={Users} label="Seats" value={car.seats} />
            <Spec icon={Gauge} label="Top Speed" value={`${car.topSpeed} km/h`} />
            <Spec icon={Cog} label="Engine" value={car.engine} />
            <Spec icon={Car} label="Drivetrain" value={car.drivetrain} />
          </div>

          {/* Car Color Selection & Price */}
          <div className="flex justify-between gap-3">
            <div className="rounded-xl border border-gray-700 bg-gray-700/30 p-4 w-full">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="size-4 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-300">Car Color</span>
                </div>
                <span className="text-xs text-gray-400">{colorLabel}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {PRESET_COLORS.map((c) => {
                  const isActive = carColor.toLowerCase() === c.value.toLowerCase();
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCarColor(c.value)}
                      title={c.name}
                      aria-label={`Car color: ${c.name}`}
                      aria-pressed={isActive}
                      className={`size-7 rounded-full transition-all duration-150 ${isActive
                        ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                        : "ring-1 ring-white/20 hover:scale-105 hover:ring-white/40"
                        }`}
                      style={{ backgroundColor: c.value }}
                    />
                  );
                })}

                {/* Custom Color Input */}
                <label
                  title="Custom color"
                  aria-label="Custom car color"
                  className={`relative size-7 cursor-pointer rounded-full transition-all duration-150 ${!presetMatch
                    ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                    : "ring-1 ring-white/20 hover:scale-105 hover:ring-white/40"
                    }`}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444)",
                  }}
                >
                  <input
                    type="color"
                    value={carColor}
                    onChange={(e) => setCarColor(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Custom car color"
                  />
                </label>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between rounded-xl bg-gray-700/50 p-4 w-full">
              <span className="text-sm text-gray-400">Price</span>
              <span className="text-xl font-bold">$ {car.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-700 bg-gray-800 p-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700 cursor-pointer"
          >
            Close
          </button>
          <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-not-allowed">
            Select Vehicle
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CarModal;
