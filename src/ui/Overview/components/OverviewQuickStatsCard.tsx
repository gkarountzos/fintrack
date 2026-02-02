import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Empty, EmptyTitle, EmptyDescription } from "@/src/ui/ui/empty";

export interface TransactionItem {
  id: string | number;
  category: string;
  date: string | Date;
  amount: number;
}

interface OverviewCardProps {
  title: string;
  description?: string;
  className?: string;

  data: TransactionItem[];
  formatCurrency: (amount: number) => string;
  emptyState: {
    title: string;
    description: string;
  };
}

export function OverviewQuickStatsCard({
  title,
  description,
  className,
  data,
  formatCurrency,
  emptyState,
}: OverviewCardProps) {
  const hasData = data && data.length > 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-4">
            {data.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
              >
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.category}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="font-medium text-red-500">
                  -{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyTitle>{emptyState.title}</EmptyTitle>
            <EmptyDescription>{emptyState.description}</EmptyDescription>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
