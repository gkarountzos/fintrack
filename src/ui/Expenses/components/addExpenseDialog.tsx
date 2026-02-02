"use client";

import React, { useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/ui/select";
import { Textarea } from "@/src/ui/ui/textarea";
import localization from "@/src/lib/localization.json";
import { Loader2 } from "lucide-react";
import { addExpenseAction } from "@/src/actions/expenses/expensesActions";
import { expensesCategories } from "@/src/ui/Expenses/constants/expensesConstants";
import {
  transactionSchema,
  TTransactionSchemaValues,
} from "@/src/schemas/transactionSchema";

interface IAddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExpenseDialog({
  open,
  onOpenChange,
}: IAddExpenseDialogProps) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof TTransactionSchemaValues, string>>
  >({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    // 3. Validate Data
    const result = transactionSchema.safeParse({
      category,
      amount: parseFloat(amount),
      date,
      description,
    });

    if (!result.success) {
      const formattedErrors: Partial<
        Record<keyof TTransactionSchemaValues, string>
      > = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof TTransactionSchemaValues;
        formattedErrors[path] = issue.message;
      });
      setFieldErrors(formattedErrors);
      return;
    }

    startTransition(async () => {
      const response = await addExpenseAction({
        category: result.data.category,
        amount: result.data.amount.toString(),
        date: result.data.date,
        description: result.data.description || "",
      });

      if (response?.error) {
        setServerError(response.error);
      } else {
        onOpenChange(false);
        setCategory("");
        setAmount("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{localization.expenses.addExpense}</DialogTitle>
            <DialogDescription>{localization.app.tagline}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {serverError && (
              <div className="text-sm text-red-500 font-medium">
                {serverError}
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="category"
                className={fieldErrors.category ? "text-red-500" : ""}
              >
                {localization.expenses.category}
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="category"
                  className={fieldErrors.category ? "border-red-500" : ""}
                >
                  <SelectValue
                    placeholder={localization.common.selectCategory}
                  />
                </SelectTrigger>
                <SelectContent>
                  {expensesCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldErrors.category && (
                <span className="text-xs text-red-500">
                  {fieldErrors.category}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="amount"
                className={fieldErrors.amount ? "text-red-500" : ""}
              >
                {localization.expenses.amount}
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder={localization.common.enterAmount}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={fieldErrors.amount ? "border-red-500" : ""}
              />
              {fieldErrors.amount && (
                <span className="text-xs text-red-500">
                  {fieldErrors.amount}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="date"
                className={fieldErrors.date ? "text-red-500" : ""}
              >
                {localization.expenses.date}
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldErrors.date ? "border-red-500" : ""}
              />
              {fieldErrors.date && (
                <span className="text-xs text-red-500">{fieldErrors.date}</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                {localization.expenses.description}
              </Label>
              <Textarea
                id="description"
                placeholder={localization.common.enterDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
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
              {localization.common.cancel}
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {localization.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
