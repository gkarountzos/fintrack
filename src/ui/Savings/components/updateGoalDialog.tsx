"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/ui/ui/dialog";
import { Button } from "@/src/ui/ui/button";
import { Input } from "@/src/ui/ui/input";
import { Label } from "@/src/ui/ui/label";
import { Loader2 } from "lucide-react";
import localization from "@/src/lib/localization.json";
import { updateGoalAmountAction } from "@/src/actions/savings/savingsActions";

interface UpdateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: { id: string; name: string; current_amount: number } | null;
}

export function UpdateGoalDialog({
  open,
  onOpenChange,
  goal,
}: UpdateGoalDialogProps) {
  const [amount, setAmount] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    startTransition(async () => {
      const result = await updateGoalAmountAction(goal.id, parseFloat(amount));

      if (!result.error) {
        onOpenChange(false);
        setAmount("");
      } else {
        console.error(result.error);
      }
    });
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add to {goal.name}</DialogTitle>
            <DialogDescription>
              Current balance: {localization.common.currency}
              {goal.current_amount.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount to Add</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !amount}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deposit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
