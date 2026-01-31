import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";

interface OverviewCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function OverviewQuickStatsCard({
  title,
  description,
  children,
  className,
}: OverviewCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
