import localization from "@/src/lib/localization.json";

export const SummaryRow = ({
  label,
  value,
  valueClass = "",
  isLast = false,
}: {
  label: string;
  value: string;
  valueClass?: string;
  isLast?: boolean;
}) => (
  <div
    className={`flex items-center justify-between ${!isLast ? "border-b border-border pb-3" : ""}`}
  >
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`font-semibold ${valueClass}`}>
      {localization.common.currency !== "-" && !value.startsWith("-")
        ? localization.common.currency
        : ""}
      {value}
    </span>
  </div>
);
