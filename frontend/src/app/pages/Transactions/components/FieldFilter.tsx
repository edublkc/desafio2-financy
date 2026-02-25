interface FieldFilterProps {
  label: string;
  children: React.ReactNode;
}

export function FieldFilter({ label, children }: FieldFilterProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      {children}
    </div>
  );
}