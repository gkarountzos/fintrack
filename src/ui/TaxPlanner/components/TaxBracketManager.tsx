import { Button } from "@/src/ui/ui/button";
import { Input } from "@/src/ui/ui/input";
import { Label } from "@/src/ui/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/ui/card";
import { Plus, Trash2 } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { TTaxBracket } from "@/src/types/Tax";

interface TaxBracketManagerProps {
  brackets: TTaxBracket[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof TTaxBracket, value: number) => void;
}

export function TaxBracketManager({
  brackets,
  onAdd,
  onRemove,
  onUpdate,
}: TaxBracketManagerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{localization.taxPlanner.taxBracketManager}</CardTitle>
        <CardDescription>Define progressive tax brackets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {brackets.map((bracket) => (
          <div key={bracket.id} className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">
                {localization.taxPlanner.incomeUpTo}
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm text-muted-foreground">
                  {localization.common.currency}
                </span>
                <Input
                  type="number"
                  value={bracket.incomeUpTo || ""}
                  onChange={(e) =>
                    onUpdate(bracket.id, "incomeUpTo", Number(e.target.value))
                  }
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">
                {localization.taxPlanner.taxRate}
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={bracket.taxRate || ""}
                  onChange={(e) =>
                    onUpdate(bracket.id, "taxRate", Number(e.target.value))
                  }
                  className="pr-8"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onRemove(bracket.id)}
                disabled={brackets.length === 1}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={onAdd}
          className="w-full bg-transparent"
        >
          <Plus className="mr-2 h-4 w-4" />
          {localization.taxPlanner.addBracket}
        </Button>
      </CardContent>
    </Card>
  );
}
