export const LegendItem = ({
  color,
  label,
  percentage,
}: {
  color: string;
  label: string;
  percentage: number;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="text-sm font-medium">{percentage}%</span>
  </div>
);
