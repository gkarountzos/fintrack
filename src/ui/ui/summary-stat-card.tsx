import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface SummaryStatCardProps {
  title: string;
  value: string | number | ReactNode;
  icon?: LucideIcon;
  description?: string;
}

export function SummaryStatCard({
  title,
  value,
  icon: Icon,
  description,
}: SummaryStatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          {title}
          {Icon && <Icon className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
