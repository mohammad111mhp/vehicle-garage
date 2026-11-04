type SpecProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
};

function Spec({ icon: Icon, label, value }: SpecProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-700/30 p-3">
      <Icon className="size-5 shrink-0 text-blue-400" />
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export default Spec;